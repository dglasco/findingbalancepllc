# findingbalances.com

New site for Reem Glasco, LPC-S (Finding Balance Counseling), rebuilt from the content on
findingbalancecounselingpllc.com.

**Positioning: this is Reem's practitioner site, not a therapy practice site.** The primary
audience is therapists, because that is where the rare credential and the recurring revenue
are: LPC supervision, EMDRIA-approved EMDR consultation, retreats and training. Almost nobody
in Texas competes for "IFS-informed EMDR supervisor", while hundreds compete for "trauma
therapist Austin". Clients are still served, through a `/therapy` hub and four condition pages
that route most of them to the practice's associates, who then become a referral network rather
than a competing message.

Twenty pages plus a 404, built with Eleventy. No CMS, no tracking scripts, no cookies.

`dist/preview.html` is a single self-contained file holding every page, for review on a phone. Its links are click handlers rather than hrefs, because in-app file viewers treat any
href as leaving the page. Do not deploy it as the site; deploy the individual pages.

## Build and preview

Eleventy 3 with npm, no Python.

```
npm install
npm run build     # writes ./dist
npm run dev       # eleventy --serve with live reload
npm run deploy    # build, then wrangler deploy
```

`npm run build` cleans `dist/` first, via node's `fs.rmSync`, so a renamed or deleted page
cannot leave a stale file behind to be deployed.

### How it is put together

| Path | What it holds |
| --- | --- |
| `src/*.njk`, `src/for-therapists/*.njk`, `src/therapy/*.njk` | One file per page. YAML front matter plus the page body. |
| `src/_data/site.js` | Contact details, licence number, the facts quoted in `llms.txt`, and the redirect map. Global data, available as `site` in every template. |
| `src/_includes/layouts/base.njk` | Head tags, canonical, Open Graph, JSON-LD, masthead, breadcrumbs, footer. |
| `src/_includes/partials/*.njk` | Blocks that repeat across pages: the CTA band, the why-Reem band, the CTA trio, the crisis note. |
| `eleventy.config.js` | Nav, breadcrumb and children filters, the JSON-LD builder, and the FAQ schema transform. |
| `src/sitemap.njk`, `src/robots.njk`, `src/llms.njk`, `src/_redirects.njk` | Generated text files, driven by the page collection and `site.js`. |
| `src/_headers` | Copied through as-is. |
| `src/preview.njk` | Every page in one self-contained file for phone review. `noindex`, and not for deployment. |

### Adding a page

Drop a `.njk` file in `src/`, or in `src/for-therapists/` or `src/therapy/` to make it a child
of that hub. The file path is the URL: `src/for-therapists/lpc-supervision.njk` becomes
`/for-therapists/lpc-supervision/`. Front matter carries the rest:

```yaml
---
layout: layouts/base.njk
tags: pages
title: Page title, under 60 characters
description: Meta description, under 165 characters
nav: Short nav label
order: 7             # sorts nav, footer, sitemap and llms.txt; decimals are fine,
                     # so a hub's children sit between it and the next top-level page
priority: "0.8"      # optional, sitemap priority
inNav: false         # optional, keep it out of the primary nav
schema: [{ "@type": "Service", ... }]   # optional, extra JSON-LD graph entries
---
```

Nav, breadcrumbs, the sitemap, `llms.txt`, the footer index and the hub's `ItemList` schema all
pick it up from there. Nothing else needs editing.

### Two things worth knowing

**FAQ schema is derived, not declared.** A transform in `eleventy.config.js` reads the
`<details>` accordions out of the rendered HTML and writes the `FAQPage` block into the head,
replacing a `<!--FAQ_SCHEMA-->` placeholder. Add a question to a page and the structured data
follows. This means the markup can never claim a question the reader cannot see, which is
exactly the thing Google penalises.

**URLs carry a trailing slash.** Eleventy's default permalinks produce `/about/`, which is what
Cloudflare's `auto-trailing-slash` handling serves for folder index files. Canonicals, the
sitemap and the redirect targets all use that form, so there is no redirect hop.

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
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | repo root |

Cloudflare's build image runs Node, so `npm install` and `npm run build` work without any extra
configuration. `dist/` is also committed as a fallback, which means a deploy still succeeds if
you ever clear the build command, but the committed copy then has to be rebuilt before pushing
or you ship the previous build.

### From the command line

```
npm install
npm run build
npx wrangler pages dev dist    # local preview with clean URLs and _redirects applied
npm run deploy
```

### Domain and DNS

Add `findingbalances.com` and `www.findingbalances.com` as custom domains on the Worker, then
pick one canonical host and 301 the other to it. `url` in `src/_data/site.js` must match the
canonical host exactly, because every canonical tag, sitemap entry and JSON-LD `@id` is built
from it.

### After the first deploy

Verify the deploy actually landed rather than trusting the green checkmark:

```
curl -sI https://findingbalances.com/for-therapists/lpc-supervision | head -1
curl -sI https://findingbalancecounselingpllc.com/supervision/     # expect 301
curl -s https://findingbalances.com/robots.txt | tail -1
```

Keep the old domain resolving until the redirects are confirmed working. The redirect map is
`redirects` in `src/_data/site.js` and is written to `dist/_redirects` on every build.

## What was deliberately not migrated

The old WordPress site has 81 URLs. Twenty-six of them are untouched BrighterVision vendor
boilerplate: third-person condition explainers at `/autism/`, `/play-therapy/`, `/sex-therapy/`,
`/emotional-support-animals/`, `/add-adhd-counseling/` and the like, none of which name the
practice, a city, a fee, an associate, or any modality this practice actually uses. Two of them
open with an identical sentence. Migrating them would mean publishing duplicate content shared
with every other BrighterVision therapist site, and advertising services the practice may not
provide. They are not in the redirect map and should 410 rather than 301.

Eleven more are junk or abandoned: `/sample-page/`, `/fffff/`, `/ggg/`, `/2279-2/`,
`/about/1483-2/`, `/hello-world/`, four "coming soon" posts from 2022 and 2023 that never
arrived, and two duplicate twins.

Still to migrate, in rough priority order: the five client-form PDFs at `/client-forms/`, two of
which (Good Faith Estimate, Limits of Confidentiality) are legally required disclosures; the
privacy policy PDF; the "physically located in Texas" telehealth rule buried in the dead 2020
COVID page; the ethics CEU detail at `/ggg/` (one CEU online, two in person on a trail walk,
topic secondary trauma) which would replace the placeholder text on the retreats page; the
`/mental-health-links/` resource directory, which needs a link audit first because it predates
988 and several of its links are dead; and `/how-to-set-healthy-boundaries/`, the only finished
article on the old site. The old blog paginates to three pages, so there are posts beyond the
81 URLs that have not been triaged.

## Information architecture

Primary nav, therapist-first: For Therapists, Licensure Guide, Therapy, About, Fees, FAQ,
Contact. Home is reached through the wordmark. Only top-level pages appear in the nav
(`navItems` filters on depth), so the two hubs carry their own children rather than the nav
growing. Approach is deliberately kept out (`inNav: false`) and reached from in-page links and
the footer; it remains in the sitemap and ranks on its own terms.

Two hubs, each with children:

- `/for-therapists` : `/lpc-supervision`, `/emdr-consultation`, `/retreats-training`
- `/therapy` : `/trauma`, `/anxiety`, `/depression`, `/walk-and-talk`, `/associates`

`/book` is top level and in the nav, which makes the nav eight items. It covers *Effort-less
Self-Care* and the companion *Reset* journal, and carries the site's only photograph, the book
cover, which is also the only `og:image` on the site.

`/contact` has two children: `/contact/client-portal` and `/contact/forms`. Neither is in the
nav, which stays at eight items; both are reached from the contact page, the fees page and each
other. The portal page is the answer to "can we take payments and bookings": a static site
cannot hold card details or a clinical calendar, so both route to the practice's EHR portal.
Set `portal.url` and `portal.name` in `src/_data/site.js` and every portal button on the site
goes live at once; leave them empty and those buttons route people to email instead, which is
what they do today.

The five client forms are listed from `site.forms` and rendered through an `assetExists` filter,
so a PDF that has not been dropped into `src/assets/forms/` yet renders as "sent to you by email"
rather than as a dead link. Download the six PDFs from the old WordPress site's
`/wp-content/uploads/` and save them under the filenames in `site.forms` plus
`privacy-policy.pdf`; they turn into download links on the next build with no code change.
Neither this container nor the laptop shell can fetch them, because the old domain is not on the
egress allowlist.

`/therapy/associates` is the roster of the six LPC Associates, rebuilt from the old site's
staff pages. It is the destination the positioning depends on: most client enquiries are meant
to land on an associate, so this page carries each person's fee, sliding-scale floor,
specialisms and direct contact route rather than a form.

The therapy children are the four old WordPress condition pages rebuilt rather than redirected
into the hub, because they ranked on their own. Each carries the same direct-answer block, fact
list and FAQ pattern as a supervision page, links back to `/therapy` and `/approach`, and takes
the 301 from its old URL. The hub is now a router: a direct-answer block, four pathway cards,
the Reem-or-associate split, and the fee questions that are not condition specific.

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

The renewal section is deliberately incomplete. It states the continuing education
requirements, the jurisprudence exam and the supervisor CE rule, all of which come from the
rule text, and it explicitly refuses to publish renewal fees or late-renewal windows because
BHEC sets those and changes them more often than the rules. Do not let anyone "helpfully" fill
those in from a third-party site.

One inconsistency to settle: that section uses American spelling (`license`, `counselors`)
because it is the regulated term and the search term, while the rest of the site uses British
spelling (`licence`, `counselling`). The audience is entirely Texan. Switching the whole site
to American spelling is the obvious call, but it touches every page, so it has not been done.

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
- 117 question-and-answer pairs across the supervision, EMDR, therapy, condition, associate,
  book, portal, forms and FAQ pages,
  each phrased the way someone would actually ask, each mirrored in `FAQPage` markup. Questions
  are kept distinct per page, so no two pages claim the same `Question` node.
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
the hero window gradient in `src/index.njk`.

One interactive element: a breathing timer on the home page, four in, two hold, six out. It is
user-triggered, keyboard reachable, and respects `prefers-reduced-motion`.

If Reem would rather not send visitors' IPs to Google, download the two font families into
`src/assets/fonts/` and swap the `<link>` in `src/_includes/layouts/base.njk` for `@font-face`
rules. Everything
else already works offline.

## Before launch

**Facts to confirm with Reem**

0. Blue Cross Blue Shield is accepted. The old site said the opposite and that claim has been
   removed everywhere, but the page still does not say whether the practice is in network or out
   of network, which BCBS plans are covered, what a copay looks like, or whether the associates
   bill it too. Those are the four things a prospective client actually asks.

1. The old site says both "4 individual / 1 group per month" (supervision page) and "3
   individual + 1 group" (2026 supervision page). This build uses three individual plus one
   group throughout. Confirm which is right, then change it in the one place it appears per
   page.
2. Contact email. The site currently shows `info@findingbalancecounselingpllc.com` because
   that mailbox is known to work. Once `info@findingbalances.com` exists, change `EMAIL` in
   `src/_data/site.js`.
3. There is no phone number anywhere on the old site, only an empty `tel:` link. Add one to
   `src/_data/site.js` and the contact page, or decide deliberately to stay email-only.
4. The associate roster is now at `/therapy/associates`, rebuilt from the old site's staff
   pages: Nica Ayala, Sylvia Earl, Natasha Mahesh, Sheila Singh, Heather Johnston and Emmy
   Laursen. Three further staff URLs are placeholders carrying no bio, and two of the six sit
   on a slug bearing a different person's name, so treat the whole roster as unverified until
   Reem confirms it. Fees and direct contact details were taken from the old pages and each
   associate should approve their own paragraph before launch.
5. Session length for trail walk therapy. The old site says "1.15-2 hours", which this build
   reads as 75 minutes to two hours.

**Content to supply for the new pages**

- Retreat dates, format and fee; the equine training format and fee; the next ethics CEU
  offering and its §681.140(f) provider status. Until these exist, `src/for-therapists/retreats-training.njk`
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
| `/services/` | `/therapy` |
| `/counseling-for-trauma/` | `/therapy/trauma` |
| `/therapy-for-depression/` | `/therapy/depression` |
| `/anxiety-therapist-austin-tx/`, `/social-anxiety-disorder-counseling/` | `/therapy/anxiety` |
| `/walk-therapy/` | `/therapy/walk-and-talk` |
| `/staff-2-2/` and the eight individual staff slugs | `/therapy/associates` |
| `/books/`, `/journal/`, `/selfcare-journal/` | `/book` |
| `/rates-insurance/` | `/fees` |
| `/contact/`, `/appointment-request/`, `/client-forms/` | `/contact` |
| `/exploring-the-science-behind-somatic-experiencing/` | `/approach` |
| `/understanding-the-basics-of-somatic-experiencing-therapy/` | `/approach` |
| `/mental-health-links/` | `/faq` |
| `/telehealth/` | `/therapy` |

`/walk-therapy/` used to land on `/retreats-training`, which is the therapist-facing page.
It now lands on `/therapy/walk-and-talk`, which is what that old page was actually about.

Content on the four condition pages that still needs Reem's confirmation: the outdoor privacy
and weather arrangements described on `/therapy/walk-and-talk`, which are written as things the
consult settles rather than as fixed policy, and whether "adults only" for walk sessions means
18+ or is set case by case.

**After launch**

- Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Claim or update the Google Business Profile for Cedar Park, with the same name, address and
  categories used here.
- Add the new URL to Psychology Today, the EMDRIA consultant directory and the NARM directory.
- Post the licensure guide where associates actually are: Texas counselling Facebook groups,
  university counselling programme listservs, TCA. One useful resource beats ten service posts.
- Re-check the supervision openings line every term. It is the one sentence on the site with a
  shelf life, and it is quoted in `llms.txt` and the FAQ schema as well as the page.
