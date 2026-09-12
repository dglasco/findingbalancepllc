#!/usr/bin/env python3
"""Build the Finding Balance Counseling site for Cloudflare Pages.

Structure mirrors tomsscuba.com: hub pages with child pages in a folder
beneath them, clean extensionless URLs, and a repeating section template on
every offering page. Blocks that repeat across pages (the CTA band, the
why-Reem band, the crisis note) are partials defined here and injected with
{{name}} placeholders, so they cannot drift page to page.

    python3 build.py                 # writes ./dist
    python3 build.py --out DIR
    npx wrangler pages dev dist      # local preview with clean URLs
    npx wrangler pages deploy dist   # deploy

Pages live in src/pages/**.html. The file path is the URL:
    src/pages/index.html                            -> /
    src/pages/for-therapists.html                   -> /for-therapists
    src/pages/for-therapists/lpc-supervision.html   -> /for-therapists/lpc-supervision
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
from datetime import date
from pathlib import Path

ROOT = Path(__file__).parent
SRC = ROOT / "src" / "pages"
STATIC = ROOT / "static"

# --- single place to change the practice's contact details -------------------
SITE = "https://findingbalances.com"
NAME = "Finding Balance Counseling"
CLINICIAN = "Reem Glasco, LPC-S"
# Change these two lines once the findingbalances.com mailboxes are live.
EMAIL = "info@findingbalancecounselingpllc.com"
EMAIL_SUPERVISION = "reemglasco@gmail.com"
CITY = "Cedar Park"
REGION = "TX"
POSTAL = "78613"
LICENSE = "66562"
BUILT = date.today().isoformat()

META_RE = re.compile(r"^<!--meta\s*(\{.*?\})\s*-->\s*", re.S)
DETAILS_RE = re.compile(
    r"<details>\s*<summary>(?P<q>.*?)</summary>\s*"
    r"<div class=\"answer-body\">(?P<a>.*?)</div>\s*</details>",
    re.S,
)
TAG_RE = re.compile(r"<[^>]+>")


# --------------------------------------------------------------------------
# Partials: the blocks tomsscuba.com repeats on every offering page.
# --------------------------------------------------------------------------

PARTIALS = {
    # The three-way call to action, repeated mid-page and at the end.
    "cta_trio": f"""<div class="cta-row">
    <a class="cta" href="/contact">Book a free consult</a>
    <a class="cta cta--quiet" href="mailto:{EMAIL}">Email the practice</a>
  </div>""",
    # Full-band version, the equivalent of Tom's "Ready to take the plunge?"
    "cta_band": f"""<section class="band band--night">
  <div class="shell">
    <p class="eyebrow">Ready when you are</p>
    <h2>Start with a conversation</h2>
    <p>Therapy consults are fifteen minutes. Supervision and EMDR consultation consults are
    thirty. Both are free and commit you to nothing.</p>
    <div class="cta-row">
      <a class="cta" href="/contact">Request a consult</a>
      <a class="cta cta--quiet" href="mailto:{EMAIL_SUPERVISION}">Email Reem</a>
    </div>
  </div>
</section>""",
    # The equivalent of Tom's "Why Tom's Dive & Swim" block.
    "why_reem": """<section class="band band--sand">
  <div class="shell">
    <p class="eyebrow">Why Reem</p>
    <h2>Supervision and therapy from someone who is still doing the work.</h2>
    <p>Licensed in Texas since before most of her supervisees started graduate school, and
    still in the room every week. What follows is why people choose this practice over a
    cheaper hour or a closer office.</p>
    <div class="split">
      <div>
        <h3>Sixteen years as a Texas supervisor</h3>
        <p>LPC-S since 2009, licence 66562, with over fifteen years of clinical practice
        behind it. Long enough to have seen most of what walks in, and to know the difference
        between a hard case and a stuck therapist.</p>
        <h3>A body-based lens, not a borrowed one</h3>
        <p>NARM therapist, Somatic Experiencing Practitioner, EMDR certified and an EMDRIA
        Approved Consultant. These are trainings completed, not modalities mentioned.</p>
      </div>
      <div>
        <h3>Small by design</h3>
        <p>Two supervision openings a year and a limited therapy caseload. Nobody here is
        one of thirty. That is the trade: less availability, more attention.</p>
        <h3>Honest feedback, offered kindly</h3>
        <p>If nothing you bring is ever questioned, you are paying for a signature. Expect
        to be asked what you were doing and why, and expect to be told when something in the
        work is yours rather than the client's.</p>
      </div>
    </div>
  </div>
</section>""",
    "crisis_note": """<p class="note">This practice does not provide emergency care. If you are
  in crisis, call or text 988 for the Suicide and Crisis Lifeline, or 911 if you are in
  immediate danger.</p>""",
}


def strip_tags(html: str) -> str:
    text = re.sub(r"</p>\s*<p>", " ", html)
    return " ".join(TAG_RE.sub("", text).split())


def apply_partials(body: str) -> str:
    for name, block in PARTIALS.items():
        body = body.replace("{{" + name + "}}", block)
    leftover = re.findall(r"\{\{(\w+)\}\}", body)
    if leftover:
        raise SystemExit(f"unknown partial(s): {sorted(set(leftover))}")
    return body


def load_pages() -> list[dict]:
    pages = []
    for path in sorted(SRC.rglob("*.html")):
        raw = path.read_text(encoding="utf-8")
        match = META_RE.match(raw)
        if not match:
            raise SystemExit(f"{path}: missing <!--meta {{...}} --> header")
        meta = json.loads(match.group(1))
        meta["body"] = apply_partials(raw[match.end():].strip())

        rel = path.relative_to(SRC).with_suffix("")
        slug = "" if rel.name == "index" and rel.parent == Path(".") else str(rel).replace("\\", "/")
        meta["slug"] = slug
        meta["path"] = "/" if not slug else f"/{slug}"
        meta["href"] = meta["path"]
        # Where the file is written: nested folders give clean URLs on any host.
        # 404 is the exception: Cloudflare's not_found_handling looks for
        # /404.html at the root of the asset directory, not /404/index.html.
        if slug == "404":
            meta["out"] = "404.html"
        else:
            meta["out"] = "index.html" if not slug else f"{slug}/index.html"
        meta["depth"] = 0 if not slug else slug.count("/")
        meta["parent"] = slug.rsplit("/", 1)[0] if "/" in slug else ""
        pages.append(meta)

    known = {p["slug"] for p in pages}
    for p in pages:
        if p["parent"] and p["parent"] not in known:
            raise SystemExit(f"{p['slug']}: no hub page at /{p['parent']}")
    return sorted(pages, key=lambda p: (p.get("order", 99), p["slug"]))


def faq_entities(body: str) -> list[dict]:
    return [
        {
            "@type": "Question",
            "name": strip_tags(m.group("q")),
            "acceptedAnswer": {"@type": "Answer", "text": strip_tags(m.group("a"))},
        }
        for m in DETAILS_RE.finditer(body)
    ]


def base_graph() -> list[dict]:
    """Entities describing the practice, repeated on every page so a crawler or
    an answer engine can resolve them from any entry point."""
    return [
        {
            "@type": "WebSite",
            "@id": f"{SITE}/#website",
            "url": SITE + "/",
            "name": NAME,
            "inLanguage": "en-US",
            "publisher": {"@id": f"{SITE}/#practice"},
        },
        {
            "@type": ["MedicalBusiness", "ProfessionalService"],
            "@id": f"{SITE}/#practice",
            "name": NAME,
            "alternateName": "Finding Balance Counseling PLLC",
            "url": SITE + "/",
            "email": EMAIL,
            "priceRange": "$185 - $425",
            "medicalSpecialty": "Psychiatric",
            "founder": {"@id": f"{SITE}/#reem"},
            "address": {
                "@type": "PostalAddress",
                "addressLocality": CITY,
                "addressRegion": REGION,
                "postalCode": POSTAL,
                "addressCountry": "US",
            },
            "areaServed": [
                {"@type": "State", "name": "Texas"},
                {"@type": "City", "name": "Austin"},
                {"@type": "City", "name": "Cedar Park"},
            ],
            "availableLanguage": "English",
            "knowsAbout": [
                "LPC supervision",
                "IFS-informed EMDR",
                "NeuroAffective Relational Model",
                "Somatic Experiencing",
                "developmental trauma",
                "C-PTSD",
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services",
                "itemListElement": [
                    {
                        "@type": "Offer",
                        "itemOffered": {"@type": "Service", "name": "LPC supervision for Texas LPC Associates"},
                        "price": "425",
                        "priceCurrency": "USD",
                        "eligibleDuration": {"@type": "QuantitativeValue", "value": 1, "unitCode": "MON"},
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {"@type": "Service", "name": "EMDRIA-approved EMDR consultation"},
                        "price": "185",
                        "priceCurrency": "USD",
                    },
                    {
                        "@type": "Offer",
                        "itemOffered": {"@type": "Service", "name": "Individual therapy, 50 minutes, online"},
                        "price": "240",
                        "priceCurrency": "USD",
                    },
                ],
            },
        },
        {
            "@type": "Person",
            "@id": f"{SITE}/#reem",
            "name": "Reem Glasco",
            "honorificSuffix": "LPC-S",
            "jobTitle": "Licensed Professional Counselor Supervisor",
            "worksFor": {"@id": f"{SITE}/#practice"},
            "email": EMAIL,
            "knowsLanguage": "English",
            "hasCredential": [
                {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "license",
                    "name": f"Texas Licensed Professional Counselor Supervisor (LPC-S), license {LICENSE}",
                    "recognizedBy": {"@type": "Organization", "name": "Texas Behavioral Health Executive Council"},
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certification",
                    "name": "EMDRIA Approved Consultant",
                    "recognizedBy": {"@type": "Organization", "name": "EMDR International Association"},
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certification",
                    "name": "Somatic Experiencing Practitioner (SEP)",
                },
                {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certification",
                    "name": "NARM Therapist",
                },
            ],
            "sameAs": ["https://www.psychologytoday.com/us/therapists?search=reem+glasco"],
        },
    ]


def trail(page: dict, by_slug: dict) -> list[dict]:
    """Home, then each hub above this page, then the page itself."""
    chain = []
    slug = page["slug"]
    while slug:
        chain.append(by_slug[slug])
        slug = by_slug[slug]["parent"]
    chain.reverse()
    return chain


def page_graph(page: dict, by_slug: dict) -> list[dict]:
    url = SITE + page["path"]
    graph = [
        {
            "@type": "WebPage",
            "@id": f"{url}#webpage",
            "url": url,
            "name": page["title"],
            "description": page["description"],
            "isPartOf": {"@id": f"{SITE}/#website"},
            "about": {"@id": f"{SITE}/#practice"},
            "inLanguage": "en-US",
        }
    ]

    chain = trail(page, by_slug)
    if chain:
        items = [{"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"}]
        for i, node in enumerate(chain, start=2):
            items.append(
                {"@type": "ListItem", "position": i, "name": node["nav"], "item": SITE + node["path"]}
            )
        graph.append({"@type": "BreadcrumbList", "@id": f"{url}#breadcrumbs", "itemListElement": items})

    questions = faq_entities(page["body"])
    if questions:
        graph.append(
            {
                "@type": "FAQPage",
                "@id": f"{url}#faq",
                "isPartOf": {"@id": f"{url}#webpage"},
                "mainEntity": questions,
            }
        )

    children = [p for p in by_slug.values() if p["parent"] == page["slug"] and page["slug"]]
    if children:
        graph.append(
            {
                "@type": "ItemList",
                "@id": f"{url}#children",
                "name": page["title"],
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": i,
                        "name": c["nav"],
                        "url": SITE + c["path"],
                    }
                    for i, c in enumerate(sorted(children, key=lambda c: c.get("order", 99)), start=1)
                ],
            }
        )

    for extra in page.get("schema", []):
        extra.setdefault("provider", {"@id": f"{SITE}/#practice"})
        graph.append(extra)

    return graph


def nav_html(pages: list[dict], current: dict) -> str:
    """Top-level nav only; hubs carry their children, as on tomsscuba.com."""
    items = []
    for p in pages:
        if p.get("hidden") or not p.get("in_nav", True) or p["depth"] > 0:
            continue
        on_page = p["slug"] == current["slug"] or current["parent"].startswith(p["slug"]) and p["slug"]
        aria = ' aria-current="page"' if on_page else ""
        items.append(f'<li><a href="{p["href"]}"{aria}>{p["nav"]}</a></li>')
    return "\n        ".join(items)


def footer_links(pages: list[dict]) -> str:
    items = []
    for p in pages:
        if p.get("hidden") or not p["slug"]:
            continue
        indent = "&nbsp;&nbsp;" * p["depth"]
        items.append(f'<li>{indent}<a href="{p["href"]}">{p["nav"]}</a></li>')
    return "\n            ".join(items)


TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="{name}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="{canonical}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{description}">
<meta name="geo.region" content="US-TX">
<meta name="geo.placename" content="{city}, Texas">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400&family=Karla:wght@400;700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
<script type="application/ld+json">{jsonld}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="masthead">
  <div class="shell masthead__inner">
    <a class="wordmark" href="/">Finding Balance Counseling<span>Reem Glasco, LPC-S</span></a>
    <button class="nav__toggle" type="button" aria-controls="primary-nav">Menu</button>
    <nav class="nav" id="primary-nav" aria-label="Primary" data-open="true">
      <ul>
        {nav}
      </ul>
    </nav>
  </div>
</header>
{crumbs}
<main id="main">
{body}
</main>
<footer class="footer">
  <div class="shell">
    <div class="footer__grid">
      <div>
        <h4>Get in touch</h4>
        <p><a href="mailto:{email}">{email}</a><br>
        Supervision enquiries: <a href="mailto:{email_supervision}">{email_supervision}</a></p>
        <p>{city}, Texas {postal}<br>
        Online across Texas. Walk and equine sessions by arrangement.</p>
      </div>
      <div>
        <h4>Pages</h4>
        <ul>
          <li><a href="/">Home</a></li>
          {footer_links}
        </ul>
      </div>
      <div>
        <h4>Hours</h4>
        <p>By appointment.<br>
        Walk and table therapy on Fridays.</p>
        <p><a href="https://www.psychologytoday.com/us/therapists?search=reem+glasco">Psychology Today profile</a></p>
      </div>
    </div>
    <div class="footer__legal">
      <p>Reem Glasco is a Licensed Professional Counselor Supervisor in Texas, licence {license}.
      Complaints about a Texas licensee go to the Texas Behavioral Health Executive Council,
      1-800-821-3205. Nothing on this site is therapy, supervision, or a substitute for either.
      If you are in crisis, call or text 988.</p>
      <p>&copy; {year} Finding Balance Counseling PLLC.</p>
    </div>
  </div>
</footer>
<script src="/assets/js/site.js" defer></script>
</body>
</html>
"""


def render(page: dict, pages: list[dict], by_slug: dict) -> str:
    graph = {"@context": "https://schema.org", "@graph": base_graph() + page_graph(page, by_slug)}
    crumbs = ""
    chain = trail(page, by_slug)
    if chain:
        parts = ['<a href="/">Home</a>']
        for node in chain[:-1]:
            parts.append(f'<a href="{node["href"]}">{node["nav"]}</a>')
        parts.append(chain[-1]["nav"])
        crumbs = (
            '<nav class="shell crumbs" aria-label="Breadcrumb">' + " / ".join(parts) + "</nav>"
        )
    return TEMPLATE.format(
        title=page["title"],
        description=page["description"],
        canonical=SITE + page["path"],
        og_type="website" if not page["slug"] else "article",
        name=NAME,
        city=CITY,
        postal=POSTAL,
        email=EMAIL,
        email_supervision=EMAIL_SUPERVISION,
        license=LICENSE,
        year=date.today().year,
        jsonld=json.dumps(graph, separators=(",", ":")),
        nav=nav_html(pages, page),
        footer_links=footer_links(pages),
        crumbs=crumbs,
        body=page["body"],
    )


def sitemap(pages: list[dict]) -> str:
    rows = []
    for p in pages:
        priority = "1.0" if not p["slug"] else p.get("priority", "0.7")
        rows.append(
            "  <url>\n"
            f"    <loc>{SITE}{p['path']}</loc>\n"
            f"    <lastmod>{BUILT}</lastmod>\n"
            f"    <priority>{priority}</priority>\n"
            "  </url>"
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(rows)
        + "\n</urlset>\n"
    )


def robots() -> str:
    return (
        "User-agent: *\n"
        "Allow: /\n\n"
        "# Answer engines are welcome to read and cite these pages.\n"
        "User-agent: GPTBot\nAllow: /\n\n"
        "User-agent: OAI-SearchBot\nAllow: /\n\n"
        "User-agent: ClaudeBot\nAllow: /\n\n"
        "User-agent: PerplexityBot\nAllow: /\n\n"
        "User-agent: Google-Extended\nAllow: /\n\n"
        f"Sitemap: {SITE}/sitemap.xml\n"
    )


# Old WordPress URLs, and the flat .html paths from the first build of this
# site, both 301 to their new home. Cloudflare Pages reads this file directly.
REDIRECTS = [
    ("/about/", "/about"),
    ("/supervision/", "/for-therapists/lpc-supervision"),
    ("/group-therapy/", "/for-therapists/lpc-supervision"),
    ("/emdr-cit-consultation/", "/for-therapists/emdr-consultation"),
    ("/my-approach-to-therapy/", "/approach"),
    ("/narm-neuroaffective-relational-model/", "/approach"),
    ("/emdr/", "/approach"),
    ("/somatic-experiencing-se/", "/approach"),
    ("/services/", "/therapy"),
    ("/counseling-for-trauma/", "/therapy"),  # TODO: /therapy/trauma when that page lands
    ("/therapy-for-depression/", "/therapy"),  # TODO: /therapy/depression
    ("/anxiety-therapist-austin-tx/", "/therapy"),  # TODO: /therapy/anxiety
    ("/social-anxiety-disorder-counseling/", "/therapy"),
    ("/walk-therapy/", "/for-therapists/retreats-training"),
    ("/rates-insurance/", "/fees"),
    ("/appointment-request/", "/contact"),
    ("/client-forms/", "/contact"),
    ("/contact/", "/contact"),
    ("/blog/", "/for-therapists/retreats-training"),
    ("/books/", "/about"),
    # flat paths from the earlier build of this site
    ("/lpc-supervision", "/for-therapists/lpc-supervision"),
    ("/emdr-consultation", "/for-therapists/emdr-consultation"),
    ("/retreats-training", "/for-therapists/retreats-training"),
    ("/index.html", "/"),
]


def cloudflare_files(out: Path) -> None:
    lines = ["# 301s from the WordPress site and from the earlier flat structure."]
    lines += [f"{src}  {dst}  301" for src, dst in REDIRECTS]
    lines.append("")
    (out / "_redirects").write_text("\n".join(lines), encoding="utf-8")

    (out / "_headers").write_text(
        """/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy: default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
""",
        encoding="utf-8",
    )


def llms_txt(pages: list[dict]) -> str:
    lines = [
        f"# {NAME}",
        "",
        f"> Texas practice led by {CLINICIAN} (licence {LICENSE}), based in {CITY} and working "
        "online statewide. The practice is primarily for therapists: LPC Associates seeking "
        "supervision, therapists seeking EMDRIA-approved EMDR consultation, and clinicians "
        "attending retreats or training. Reem also holds a small therapy caseload for "
        "developmental trauma, C-PTSD, anxiety and depression, with the practice's LPC "
        "Associates seeing additional clients at lower fees.",
        "",
        "Key facts, current as of " + BUILT + ":",
        "",
        "- LPC Supervisor in Texas since 2009; over 15 years of clinical experience.",
        "- LPC supervision is $425 a month and includes three individual hours and one group hour, online, statewide in Texas.",
        "- Supervision openings: one in fall 2026 and one in spring 2027. Agency contracts of three months are $500 a month.",
        "- EMDRIA Approved Consultant. Individual EMDR consultation is $185, online.",
        "- Individual therapy is $240 for a 50-minute online session, private pay. Not accepting new BCBS clients.",
        "- Trail walk and movement therapy is $240 to $370 per session, in person in Texas, adults only.",
        "- Modalities: IFS-informed EMDR (the clinical focus), Somatic Experiencing (SEP), NARM, EMDR certified with ASSYST, PRECI and IGTP-OTS, Brainspotting, BASE-P.",
        "- Optional equine-assisted supervision and mindfulness retreats near Dripping Springs, Texas; equine supervision sessions are $60 each.",
        "- Annual mindful trail retreat for interns, associates and licensed therapists, plus periodic ethics CEUs for Texas LPCs.",
        "- The site publishes a free Texas LPC licensure guide: 3,000 supervised hours, 1,500 direct, an 18-month minimum, four supervision hours a month, no more than 50% group, and a 60-month expiry on the LPC Associate licence (22 TAC 681.92).",
        "",
        "## Pages",
        "",
    ]
    for p in pages:
        prefix = "  " * p["depth"]
        lines.append(f"{prefix}- [{p['nav']}]({SITE}{p['path']}): {p['description']}")
    lines.append("")
    return "\n".join(lines)


# --------------------------------------------------------------------------
# Single-file preview, for review on a phone. Links are click handlers with no
# href, because in-app file viewers treat any href as leaving the page.
# --------------------------------------------------------------------------

PREVIEW = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{name} | site preview</title>
<meta name="description" content="Single-file preview of the whole site.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400&family=Karla:wght@400;700&display=swap">
<style>
{css}
.page[hidden] {{ display: none; }}
a[data-page] {{ cursor: pointer; }}
</style>
</head>
<body>
<header class="masthead">
  <div class="shell masthead__inner">
    <a class="wordmark" data-page="home" role="link" tabindex="0">Finding Balance Counseling<span>Reem Glasco, LPC-S</span></a>
    <button class="nav__toggle" type="button" aria-controls="primary-nav">Menu</button>
    <nav class="nav" id="primary-nav" aria-label="Primary" data-open="true">
      <ul>
        {nav}
      </ul>
    </nav>
  </div>
</header>
<main id="main">
{sections}
</main>
<footer class="footer">
  <div class="shell">
    <div class="footer__grid">
      <div>
        <h4>Get in touch</h4>
        <p><a href="mailto:{email}">{email}</a><br>
        Supervision enquiries: <a href="mailto:{email_supervision}">{email_supervision}</a></p>
        <p>{city}, Texas {postal}</p>
      </div>
      <div>
        <h4>Pages</h4>
        <ul>{footer_links}</ul>
      </div>
      <div>
        <h4>Hours</h4>
        <p>By appointment.<br>Walk and table therapy on Fridays.</p>
      </div>
    </div>
    <div class="footer__legal">
      <p>Preview build. Reem Glasco is a Licensed Professional Counselor Supervisor in Texas,
      licence {license}. Nothing on this site is therapy or supervision. In crisis, call or
      text 988.</p>
    </div>
  </div>
</footer>
<script>
{js}
(function () {{
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));

  function show(id) {{
    if (!pages.some(function (p) {{ return p.id === id; }})) {{ id = pages[0].id; }}
    pages.forEach(function (p) {{ p.hidden = p.id !== id; }});
    document.querySelectorAll('[data-page]').forEach(function (el) {{
      if (el.getAttribute('data-page') === id) {{ el.setAttribute('aria-current', 'page'); }}
      else {{ el.removeAttribute('aria-current'); }}
    }});
    window.scrollTo(0, 0);
    var nav = document.getElementById('primary-nav');
    var toggle = document.querySelector('.nav__toggle');
    if (nav && toggle && window.matchMedia('(max-width: 55.99rem)').matches) {{
      nav.setAttribute('data-open', 'false');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }}
  }}

  function handle(event) {{
    var el = event.target.closest('[data-page]');
    if (!el) {{ return; }}
    event.preventDefault();
    show(el.getAttribute('data-page'));
  }}
  document.addEventListener('click', handle);
  document.addEventListener('keydown', function (event) {{
    if (event.key === 'Enter' || event.key === ' ') {{ handle(event); }}
  }});

  show('home');
}})();
</script>
</body>
</html>
"""


def preview(pages: list[dict]) -> str:
    css = (STATIC / "assets" / "css" / "site.css").read_text(encoding="utf-8")
    js = (STATIC / "assets" / "js" / "site.js").read_text(encoding="utf-8")
    public = [p for p in pages if not p.get("hidden")]

    def pid(p: dict) -> str:
        return "home" if not p["slug"] else p["slug"].replace("/", "--")

    def anchor(html: str) -> str:
        html = html.replace('href="/"', 'data-page="home" role="link" tabindex="0"')
        return re.sub(
            r'href="/([a-z0-9\-/]+)"',
            lambda m: f'data-page="{m.group(1).replace("/", "--")}" role="link" tabindex="0"',
            html,
        )

    sections = []
    for page in public:
        chain = " / ".join(p["nav"] for p in [page])
        crumb = (
            ""
            if not page["slug"]
            else f'<nav class="shell crumbs" aria-label="Breadcrumb"><a data-page="home" role="link" tabindex="0">Home</a> / {chain}</nav>'
        )
        sections.append(
            f'<div class="page" id="{pid(page)}" hidden>\n{crumb}\n{anchor(page["body"])}\n</div>'
        )

    def link(p: dict) -> str:
        indent = "&nbsp;&nbsp;" * p["depth"]
        return f'<li>{indent}<a data-page="{pid(p)}" role="link" tabindex="0">{p["nav"]}</a></li>'

    nav = "\n        ".join(link(p) for p in public if p["depth"] == 0 and p.get("in_nav", True))
    footer = "".join(link(p) for p in public)
    return PREVIEW.format(
        name=NAME,
        css=css,
        js=js,
        nav=nav,
        sections="\n".join(sections),
        footer_links=footer,
        email=EMAIL,
        email_supervision=EMAIL_SUPERVISION,
        city=CITY,
        postal=POSTAL,
        license=LICENSE,
    )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "dist"))
    args = ap.parse_args()
    out = Path(args.out)

    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(STATIC, out)

    pages = load_pages()
    by_slug = {p["slug"]: p for p in pages}
    for page in pages:
        target = out / page["out"]
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(render(page, pages, by_slug), encoding="utf-8")

    public = [p for p in pages if not p.get("hidden")]
    (out / "sitemap.xml").write_text(sitemap(public), encoding="utf-8")
    (out / "robots.txt").write_text(robots(), encoding="utf-8")
    (out / "llms.txt").write_text(llms_txt(public), encoding="utf-8")
    (out / "preview.html").write_text(preview(pages), encoding="utf-8")
    cloudflare_files(out)

    print(f"built {len(pages)} pages into {out}")
    for page in pages:
        faqs = len(faq_entities(page["body"]))
        extra = f"  [{faqs} FAQ]" if faqs else ""
        print(f"  {page['path']:<40} {page['title'][:44]}{extra}")


if __name__ == "__main__":
    main()
