# findingbalances.com

New site for Reem Glasco, LPC-S (Finding Balance Counseling), rebuilt from the content on
findingbalancecounselingpllc.com.

**Positioning: this is Reem's practitioner site, not a therapy practice site.** The primary
audience is therapists, because that is where the rare credential and the recurring revenue
are: LPC supervision, EMDRIA-approved EMDR consultation, retreats and training. Almost nobody
in Texas competes for "IFS-informed EMDR supervisor", while hundreds compete for "trauma
therapist Austin". Clients are still served, on one therapy page that routes most of them to
the practice's associates, who then become a referral network rather than a competing message.

Eleven pages plus a 404. No CMS, no build dependencies, no tracking scripts, no cookies.

`preview.html` in `dist/` is a single self-contained file holding every page, for review on a
phone. Its links are click handlers rather than hrefs, because in-app file viewers treat any
href as leaving the page. Do not deploy it as the site; deploy the individual pages.

## Build and preview

```
python3 build.py            # writes ./dist
python3 -m http.server -d dist 8000
```

`dist/` is the whole deployable site. You can also just open `dist/index.html` in a browser.

Edit content in `src/pages/*.html`. Each file is a body fragment with a JSON meta header.
Everything repeated across pages (head tags, nav, footer, structured data, sitemap, robots,
llms.txt) is generated in `build.py`, so titles, descriptions, breadcrumbs and FAQ schema
cannot drift from the visible page. Practice-wide details (emails, licence number, city) are
constants at the top of `build.py`.

FAQ schema is derived from the `<details>` blocks on each page, so adding a question to a page
adds it to that page's `FAQPage` markup automatically. Never put a Q&A in the schema that a
human cannot see on the page; Google treats that as a violation and it will get the rich
result dropped.

## Deploy to Cloudflare

This repo deploys as a **Workers static-assets** project (the successor to Pages). There is no
Worker script: Cloudflare serves `dist/` directly and honours `_headers` and `_redirects`
natively, the same as Pages did.

`wrangler.jsonc` holds the config:

```jsonc
{
  "name": "findingbalancepllc",
  "compatibility_date": "2026-09-12",
  "assets": {
    "directory": "./dist",
    "html_handling": "auto-trailing-slash",
    "not_found_handling": "404-page"
  }
}
```

`html_handling: auto-trailing-slash` is what makes `/for-therapists/lpc-supervision` serve that
folder's `index.html`, which is why the canonicals and the sitemap are extensionless.
`not_found_handling: 404-page` serves `dist/404.html` with a real 404 status, which is why that
one page is written to the root rather than into a folder like every other page.

### Dashboard settings, for the Workers Builds screen

| Field | Value |
| --- | --- |
| Build command | `python3 build.py` |
| Deploy command | `npx wrangler deploy` |
| Root directory | repo root |

The `dist/` folder is committed, so if the build image does not have Python 3 available, leave
the build command empty and the deploy still works. Rebuild and commit `dist/` before pushing
in that case, or the deploy ships the previous build.

### From the command line

```
npm install -D wrangler
python3 build.py
npx wrangler pages dev dist    # local preview with clean URLs
npx wrangler deploy
```

### Domain and DNS

Add `findingbalances.com` and `www.findingbalances.com` as custom domains on the Worker, then
pick one canonical host and 301 the other to it. `SITE` at the top of `build.py` must match the
canonical host exactly, because every canonical tag, sitemap entry and JSON-LD `@id` is built
from it.

### After the first deploy

Verify the deploy actually landed rather than trusting the green checkmark:

```
curl -sI https://findingbalances.com/for-therapists/lpc-supervision | head -1
curl -sI https://findingbalancecounselingpllc.com/supervision/     # expect 301
curl -s https://findingbalances.com/robots.txt | tail -1
```

Keep the old domain resolving until the redirects are confirmed working. The redirect map is in
`REDIRECTS` in `build.py` and is written to `dist/_redirects` on every build.

## Information architecture

Primary nav, therapist-first: LPC Supervision, EMDR Consultation, Retreats & Training,
Licensure Guide, About, Fees, FAQ, Contact. Home is reached through the wordmark. Approach and
Therapy are deliberately kept out of the primary nav (`"in_nav": false` in their meta headers)
and reached from in-page links and the footer, which keeps the nav to eight items and the
message on the therapist path. Both remain in the sitemap and rank on their own terms.

## The licensure guide

`/texas-lpc-licensure` is the content engine: one deep resource covering the hours, the
supervision rules, the timeline arithmetic, how to choose a supervisor, continuing education,
and how to become an LPC-S. Every reader is a potential supervisee, and it targets hundreds of
long-tail queries that no service page can reach.

Facts in it were verified against 22 Texas Administrative Code Chapter 681 and BHEC guidance in
September 2026: §681.92 (3,000 hours, 1,500 direct, 18-month floor, four hours a month, 50%
group cap), §681.72 (exams, Associate licence, LPC-S eligibility of five years), §681.82 and
§681.83 (degree and practicum), §681.140 (60-month Associate expiry, 24 CE hours per two-year
period), §681.147 (the 40-hour supervisor course). The page carries a visible "current as of"
line and tells readers to verify against BHEC.

**Re-verify before launch and at least annually.** Regulatory content that goes stale is worse
than no regulatory content. One known ambiguity is already flagged on the page: BHEC's
application guidance says the supervision course does not expire, while the rule text has
referenced recency windows.

That page also settles the supervision-structure question from the old site. Texas requires a
minimum of four supervision hours a month with no more than half in a group, so three
individual plus one group is compliant with margin, and four individual plus one group is five
hours rather than the four the old page implied.

## SEO built in

- Unique title (under 60 characters) and meta description (under 165) per page, written around
  real search intent: "LPC supervision Texas", "EMDRIA approved consultant Texas", "trauma
  therapy Austin".
- One `h1` per page, headings in a real hierarchy, keyword-bearing but readable.
- `schema.org` JSON-LD graph on every page: `MedicalBusiness` + `ProfessionalService` for the
  practice, `Person` for Reem with `hasCredential` entries for the LPC-S licence, EMDRIA
  Approved Consultant, SEP and NARM, `Service` entities with prices for supervision, EMDR
  consultation and therapy, `BreadcrumbList`, `WebPage`, `FAQPage`.
- `sitemap.xml`, `robots.txt`, canonical URLs, Open Graph and Twitter tags, `geo.region`.
- Internal linking: supervision, EMDR consultation, therapy, approach and fees all cross-link,
  so the flagship page collects links from every other page.
- Fast by construction: one 10 KB stylesheet, 1 KB of JavaScript, inline SVG instead of hero
  photography, no framework.

## AEO built in

Answer engines quote pages that state facts plainly and attributably.

- Every page opens with a direct-answer block: two to four sentences that name the entity, the
  service, the price and the location, so a model can lift a complete answer from the top of
  the page.
- 32 question-and-answer pairs across the supervision, EMDR, therapy and FAQ pages, each
  phrased the way someone would actually ask, each mirrored in `FAQPage` markup.
- Fact tables (`dl.facts`) instead of prose for anything numeric: fees, hours included,
  openings, formats.
- `llms.txt` at the site root with the practice summary and the numbers in one place.
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot and
  Google-Extended. Reverse those lines if Reem would rather not be cited by AI assistants.
- Consistent entity naming throughout: "Reem Glasco, LPC-S", "Finding Balance Counseling",
  "Cedar Park, Texas". Keep the name, address and credentials identical here, on Psychology
  Today, on the Google Business Profile and in the EMDRIA and NARM directories. Inconsistency
  is the single most common reason a practice fails to get cited.

## Design

Hearth, not horizon. The first pass was pale sage with a wide open landscape, which reads as
calm but not as cozy; coziness comes from enclosure and warm light, not expanse.

Dusk blue ground (`#dce3e7`), a deeper blue for alternating bands (`#cbd6dc`), deep indigo
enclosures (`#1f2d38`), and brass lamplight (`#b08a3c`) held as the one warm accent. Blue alone
goes clinical, so the brass does the work of keeping it cozy: it appears in the answer-block
rule, the FAQ markers, the step numbers, the breathing ring, and as the button colour inside the
dark bands. Links are deep blue (`#245c79`). A faint SVG paper grain covers everything and a warm
radial pool of light sits at the top of each page.

Body text is set in a serif (Newsreader) rather than a sans, so pages read like a book in a
chair; Karla is used only for nav, buttons and small labels. Both load from Google Fonts with
Georgia and Arial fallbacks.

Sections sit far apart on purpose, `--band` up to 9.5rem, so each screenful carries one idea.
`.band--night` is the indigo enclosure and appears two or three times per page at most: it marks
the moments that matter and gives the scroll a rhythm of light and dark. The hero is an arched
window onto dusk rather than a landscape band.

Contrast was checked against WCAG AA for every text-on-background pair. The lowest is 5.07:1
(soft ink on the deeper blue band). Brass is used as text only on the dark bands, where it
reaches 7.88:1, and never as body text on the light ground.

Tokens are named `--dusk`, `--dusk-2`, `--indigo`, `--ink`, `--ink-soft`, `--lamp`, `--link` and
`--juniper`, all at the top of `site.css`. A complete palette change is those eight values plus
the hero window gradient in `src/pages/index.html`.

One interactive element: a breathing timer on the home page, four in, two hold, six out. It is
user-triggered, keyboard reachable, and respects `prefers-reduced-motion`.

If Reem would rather not send visitors' IPs to Google, download the two font families into
`static/assets/fonts/` and swap the `<link>` in `build.py` for `@font-face` rules. Everything
else already works offline.

## Before launch

**Facts to confirm with Reem**

1. The old site says both "4 individual / 1 group per month" (supervision page) and "3
   individual + 1 group" (2026 supervision page). This build uses three individual plus one
   group throughout. Confirm which is right, then change it in the one place it appears per
   page.
2. Contact email. The site currently shows `info@findingbalancecounselingpllc.com` because
   that mailbox is known to work. Once `info@findingbalances.com` exists, change `EMAIL` in
   `build.py`.
3. There is no phone number anywhere on the old site, only an empty `tel:` link. Add one to
   `build.py` and the contact page, or decide deliberately to stay email-only.
4. The associate roster on the old site lists eleven associates, two of them as "coming soon".
   That roster is not reproduced here. Confirm who is current, then add an associates section
   to `therapy.html` with a short bio, fee and contact route for each. This matters more under
   the new positioning: the associates are the destination for most client enquiries, so vague
   placeholders cost real referrals.
5. Session length for trail walk therapy. The old site says "1.15-2 hours", which this build
   reads as 75 minutes to two hours.

**Content to supply for the new pages**

- Retreat dates, format and fee; the equine training format and fee; the next ethics CEU
  offering and its §681.140(f) provider status. Until these exist, `retreats-training.html`
  routes people to the contact form, which is honest but converts worse than a date.

**Documents to move over**

- Privacy policy (currently a PDF on the WordPress site).
- A Good Faith Estimate page. The No Surprises Act requires one for private-pay clients, and
  the old site does not appear to have it.
- Client forms and the appointment request flow. A plain HTML form is not appropriate for
  clinical detail; point at the practice's client portal instead.
- Reem's portrait, for the home page introduction and the about page.

**Redirects from the old domain**

Keep findingbalancecounselingpllc.com alive and 301 each old URL to its new home, or the
supervision page starts from zero:

| Old path | New path |
| --- | --- |
| `/` | `/` |
| `/about/` | `/about` |
| `/supervision/` | `/lpc-supervision` |
| `/group-therapy/` | `/lpc-supervision` |
| `/emdr-cit-consultation/` | `/emdr-consultation` |
| `/my-approach-to-therapy/`, `/narm-neuroaffective-relational-model/`, `/emdr/`, `/somatic-experiencing-se/` | `/approach` |
| `/services/`, `/counseling-for-trauma/`, `/therapy-for-depression/`, `/anxiety-therapist-austin-tx/`, `/social-anxiety-disorder-counseling/` | `/therapy` |
| `/walk-therapy/` | `/retreats-training` |
| `/rates-insurance/` | `/fees` |
| `/contact/`, `/appointment-request/`, `/client-forms/` | `/contact` |

The four old condition pages (trauma, depression, anxiety, social anxiety) currently rank on
their own. They fold into `/therapy` here. If they were bringing traffic, rebuild them as
separate pages rather than redirecting: one page per condition, same direct-answer and FAQ
pattern, each linking to `/therapy` and `/approach`.

**After launch**

- Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Claim or update the Google Business Profile for Cedar Park, with the same name, address and
  categories used here.
- Add the new URL to Psychology Today, the EMDRIA consultant directory and the NARM directory.
- Post the licensure guide where associates actually are: Texas counselling Facebook groups,
  university counselling programme listservs, TCA. One useful resource beats ten service posts.
- Re-check the supervision openings line every term. It is the one sentence on the site with a
  shelf life, and it is quoted in `llms.txt` and the FAQ schema as well as the page.
