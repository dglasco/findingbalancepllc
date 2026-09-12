# SEO audit: findingbalances.com

Audited 12 September 2026. Full site audit.
Live target: `https://findingbalancepllc.daveg-689.workers.dev/`
Keyword and competitor data: Semrush, US database, pulled 12 September 2026.

---

## Executive summary

The build is technically clean and unusually well structured for a solo practice: unique
titles and descriptions on every page, one `h1` each, a real JSON-LD graph, derived FAQ schema,
a sitemap, and a 335 KB whole-site payload with no tracking and no framework. The SEO problem
here is not quality, it is that **the site is not actually reachable at the domain it claims to
be**. Every canonical, every sitemap entry, every JSON-LD `@id` and the `robots.txt` sitemap
line point at `https://findingbalances.com`, which does not resolve in DNS today. Until that is
fixed, nothing indexes correctly no matter what else is done.

The second thing worth knowing is that the old WordPress site is not the asset it was assumed
to be. `findingbalancecounselingpllc.com` ranks for **43 keywords across 8 URLs, with zero
page-one positions and roughly 2 estimated organic visits a month**. So the migration is close
to greenfield, and the redirect map is about preserving link equity, not traffic. But the
equity is real: the old domain has **159 referring domains and an Authority Score of 5**, which
is in the same range as the Texas supervision competitors that pull 150+ visits a month. The
old site has roughly competitor-level authority and converts none of it. That is a content and
targeting gap, not a link gap, and it is the most encouraging fact in this audit.

**Top three priorities:** (1) point `findingbalances.com` at the Worker and confirm DNS before
anything else; (2) fix four missing redirects, including the two blog posts that are the old
site's best-ranking URLs; (3) rebuild NARM as its own page, because `narm therapy` is 1,000
searches a month at KD 15, the old site ranked #16 for it, and it is currently one section of
a multi-modality `/approach` page.

**Overall assessment: strong foundation, blocked on launch mechanics.**

---

## Keyword opportunity table

Volume and Keyword Difficulty from Semrush, US database, September 2026. "Current ranking" is
the old WordPress domain, since the new domain has no history. Intent codes as Semrush returns
them: 0 commercial, 1 informational, 2 navigational, 3 transactional.

| Keyword | Volume | KD | Opportunity | Current ranking | Intent | Recommended content |
| --- | --- | --- | --- | --- | --- | --- |
| narm therapy | 1,000 | 15 | High | #16 (old `/narm.../`) | Informational | Dedicated `/approach/narm/` page |
| texas lpc license renewal | 480 | 13 | High | Not ranking | Navigational | Section + FAQ in licensure guide |
| walk and talk therapy | 390 | 23 | High | Not ranking | Informational | `/therapy/walk-and-talk/` (built) |
| brainspotting therapist | 390 | 15 | High | Not ranking | Informational | New page or `/approach` child |
| emdr consultation | 320 | 5 | High | Not ranking | Commercial | `/for-therapists/emdr-consultation/` |
| cptsd therapist | 320 | 14 | High | Not ranking | Informational | `/therapy/trauma/` (built) |
| emdr certification requirements | 320 | 18 | High | Not ranking | Informational | Guide page for the EMDR funnel |
| emdr intensive | 260 | 9 | High | Not ranking | Informational | Only if Reem offers intensives |
| outdoor therapy | 260 | 15 | High | Not ranking | Commercial | `/therapy/walk-and-talk/` (built) |
| neuroaffective relational model | 260 | 39 | Medium | #15 (old `/narm.../`) | Informational | Same NARM page |
| developmental trauma therapy | 210 | 20 | High | Not ranking | Informational | `/therapy/trauma/` (built) |
| trauma therapy austin | 210 | 27 | Medium | Not ranking | Commercial | `/therapy/trauma/` (built) |
| emdria approved consultant | 170 | 28 | High | Not ranking | Transactional | EMDR consultation page |
| how to become emdr certified | 170 | 14 | High | Not ranking | Informational | Guide page for the EMDR funnel |
| narm training | 170 | 32 | Medium | Not ranking | Navigational | `/for-therapists/retreats-training/` |
| texas lpc requirements | 170 | 37 | Medium | Not ranking | Informational | Licensure guide |
| social anxiety therapist | 140 | 12 | High | Not ranking | Commercial | `/therapy/anxiety/` (built) |
| emdr therapist austin | 140 | 9 | High | Not ranking | Informational | `/approach` or an EMDR child page |
| complex trauma therapist | 140 | 12 | High | Not ranking | Commercial | `/therapy/trauma/` (built) |
| anxiety therapy austin tx | 140 | 48 | Low | #24 (old anxiety page) | Commercial | `/therapy/anxiety/`, do not prioritise |
| equine therapy austin | 110 | 15 | High | #67 (old `/walk-therapy/`) | Commercial | Dedicated equine page |
| how to become an lpc in texas | 110 | 30 | Medium | Not ranking | Informational | Licensure guide |
| online lpc supervision | 90 | 4 | High | Not ranking | Commercial | `/for-therapists/lpc-supervision/` |
| trauma therapist austin | 90 | 24 | Medium | Not ranking | Commercial | `/therapy/trauma/` (built) |
| therapist cedar park tx | 70 | 31 | Medium | Not ranking | Commercial | Local: GBP + LocalBusiness schema |
| equine therapy retreat | 50 | 13 | High | #45 (old `/walk-therapy/`) | Commercial | Equine page or retreats page |
| depression therapist austin | 50 | 17 | High | Not ranking | Commercial | `/therapy/depression/` (built) |
| ifs therapy austin | 50 | 12 | High | Not ranking | Commercial | `/approach` IFS-informed EMDR section |
| emdr therapist texas | 50 | 7 | High | Not ranking | Commercial | EMDR child page |
| who can supervise an lpc associate in texas | 20 | 0 | High | Not ranking | Informational | Licensure guide FAQ, one paragraph |

**Do not chase:** `somatic experiencing` (4,400, KD 90) and `somatic experiencing practitioner`
(1,000, KD 62) are owned by the SE Institute and academic sources. `therapist austin tx` (480,
KD 57) and `anxiety therapist austin` (110, KD 49) are the crowded terms the positioning
decision already, correctly, walked away from.

**SERP feature note:** of the old domain's 43 ranking keywords, **23 trigger a local pack, 30
trigger People Also Ask, and 23 trigger an AI Overview**. Roughly half this keyword set is
decided by local signals, and two thirds by question-shaped answers. That is direct evidence
that the Google Business Profile work and the FAQ/AEO investment are aimed at the right things.

---

## On-page issues

| Page | Issue | Severity | Recommended fix |
| --- | --- | --- | --- |
| All 17 pages | Canonical, `og:url` and JSON-LD `@id` point to `https://findingbalances.com`, which does not resolve in DNS | Critical | Point the domain at the Worker, or change `url` in `src/_data/site.js` to the host actually being served |
| `robots.txt` | `Sitemap:` line points at the same non-resolving host | Critical | Same fix, it is generated from `site.url` |
| `/for-therapists/lpc-supervision/` | JSON-LD `Service` `@id` is `.../lpc-supervision#service`, but the page is at `/for-therapists/lpc-supervision/` | High | Correct the `@id` in front matter to the nested URL |
| `/for-therapists/emdr-consultation/` | Same `@id` mismatch | High | Same |
| `/for-therapists/retreats-training/` | Same `@id` mismatch | High | Same |
| All pages | No `og:image`, while `twitter:card` claims `summary_large_image` | High | Add one 1200x630 image and an `og:image` tag, or downgrade the card to `summary` |
| All pages | `MedicalBusiness` node has no `telephone`, `geo`, `openingHoursSpecification`, `image` or `sameAs` | High | Add them once a phone number and portrait exist; `geo` and hours can go in now |
| All pages | `Person` `sameAs` is a Psychology Today **search** URL, not a profile URL | Medium | Replace with the real profile, and add EMDRIA and NARM directory listings |
| `dist/404.html` | Serves `<meta name="robots" content="index, follow">` | Medium | Set `noindex` in `src/404.njk` front matter and make the layout honour it |
| `dist/llms.txt` | Contains three raw HTML entities (`&#39;`, `&amp;`) in a plain-text file | Medium | Add `\| safe` to the description and nav output in `src/llms.njk` |
| `/for-therapists/` | Zero in-body inbound internal links; reachable only from nav and footer | Medium | Link to it from `/texas-lpc-licensure/` and `/about/` |
| `/faq/` | Only one in-body inbound internal link | Medium | Link from the fees page and the contact page |
| `/for-therapists/emdr-consultation/` | 389 words, the thinnest service page on the site, targeting `emdr consultation` (320, KD 5) | Medium | Expand toward the depth of the supervision page (1,037 words) |
| `/about/` | 363 words for the page carrying all the E-E-A-T weight for a health practice | Medium | Expand with training dates, supervision philosophy, and the portrait |
| `/approach/` | Title is 62 characters | Low | Trim under 60 |
| `/for-therapists/retreats-training/` | Title is 65 characters | Low | Trim under 60 |
| `/` and `/fees/` | Meta descriptions 167 and 166 characters | Low | Trim to 165 |
| All pages | Zero images site-wide, so no image search presence and no image alt signals | Low | Comes with the portrait; keep inline SVG as is |
| All schema | `availableChannel.serviceUrl` is `/contact` with no trailing slash, unlike every other URL on the site | Low | Add the trailing slash to avoid a redirect hop |

---

## Content gaps

### 1. NARM has no page of its own

**Why it matters.** `narm therapy` is 1,000 searches a month at KD 15, and
`neuroaffective relational model` another 260 at KD 39. The old site's
`/narm-neuroaffective-relational-model/` page ranked #16 and #15 for them and accounted for
half of its total organic traffic across 7 keywords. In the new build that page redirects into
`/approach`, where NARM is one `h2` inside a 1,108-word page covering four modalities. A
section does not compete with a page.

**Recommended format.** `/approach/narm/`, using the same hub-and-child pattern now in use at
`/therapy` and `/for-therapists`. Reem is a NARM therapist, which is a defensible authorship
signal on an informational term that is currently answered mostly by training organisations.

**Priority: high. Effort: moderate (half day).**

### 2. EMDR and Somatic Experiencing have the same problem

**Why it matters.** `emdr therapist austin` (140, KD 9), `emdr therapist texas` (50, KD 7) and
`ifs therapy austin` (50, KD 12) are all low-difficulty commercial terms with no page pointed
at them. The old site had separate `/emdr/` and `/somatic-experiencing-se/` pages; both now
fold into `/approach`. SE itself is unwinnable at KD 90, but the Austin and Texas qualified
variants are not.

**Recommended format.** `/approach/emdr/` and `/approach/ifs-informed-emdr/` as children,
leaving `/approach` as the router. Skip a standalone SE page and keep SE as a section.

**Priority: high. Effort: moderate.**

### 3. Equine work has no destination

**Why it matters.** `equine therapy austin` (110, KD 15) and `equine therapy retreat` (50,
KD 13) are winnable, and the old `/walk-therapy/` page already ranked for both, at #67 and #45.
Today equine content is split across three pages: a paragraph on `/therapy/walk-and-talk/`, a
mention on `/for-therapists/lpc-supervision/`, and part of `/for-therapists/retreats-training/`.
Nothing owns the term.

**Recommended format.** One page, probably `/therapy/equine/`, covering the client-facing
equine sessions and linking to the therapist-facing training. Note the intent split: `equine
therapy retreat` and `horse therapy retreat` are retreat intent, so they belong on
`/for-therapists/retreats-training/`, not the client page.

**Priority: medium. Effort: moderate.**

### 4. The EMDR certification funnel stops short

**Why it matters.** `emdr certification requirements` (320, KD 18) and `how to become emdr
certified` (170, KD 14) are exactly the licensure-guide pattern that works, applied to the
other credential Reem sells against. Every person searching those terms is a potential
consultation client, and `emdria approved consultant` is 170 a month at KD 28 with almost no
individual consultants ranking: page one is national institutes and EMDRIA itself.

**Recommended format.** A guide page mirroring `/texas-lpc-licensure/`, at something like
`/for-therapists/emdr-certification/`.

**Priority: high. Effort: substantial (multi-day, needs fact-checking against EMDRIA rules).**

### 5. Texas LPC renewal is missing from the guide

**Why it matters.** `texas lpc license renewal` is 480 searches a month at KD 13, the highest
volume winnable term in this whole set. The licensure guide covers getting licensed but the
renewal cycle is only mentioned as the 24 CE hours per two-year period under §681.140.

**Recommended format.** A renewal section in the existing guide plus two FAQ entries, not a new
page. The guide is already 1,584 words and ranks on depth.

**Priority: high. Effort: quick win (1 to 2 hours).**

### 6. Nothing exists at the decision stage for supervision

**Why it matters.** The funnel runs awareness (licensure guide) to decision (supervision page)
with nothing in between. Competitors that outrank on supervision terms, notably
firelightsupervision.com at 408 keywords, publish comparison and selection content.

**Recommended format.** "How to choose an LPC supervisor in Texas" exists as a section of the
guide. Promote it to its own page, and add a page answering `how much does lpc supervision
cost` (20, KD 0) with real Texas market ranges rather than only Reem's fee.

**Priority: medium. Effort: moderate.**

### 7. Freshness and thin pages

No page is stale, since the whole site is new. Two pages are thin for what they are asked to
do: `/for-therapists/emdr-consultation/` at 389 words and `/about/` at 363. In a health
practice, the About page carries the experience and trust signals Google's quality guidance
leans on hardest, and only the contact page and the 404 are shorter.

---

## Technical SEO checklist

| Check | Status | Details |
| --- | --- | --- |
| HTTPS | Pass | Worker serves HTTPS; no mixed content, all assets same-origin |
| Canonical tags | **Fail** | Present and unique on every page, but all point at a host that does not resolve |
| XML sitemap | **Fail** | Well formed, 16 URLs, correct priorities, but all `<loc>` values use the non-resolving host |
| robots.txt | Warning | Correct directives and explicit AI crawler allowances; the `Sitemap:` line has the same host problem |
| Indexation | Warning | Live deployment is behind the repo: the four `/therapy/` child pages exist in the build but are not deployed |
| 404 handling | Warning | Real 404 status via `not_found_handling: 404-page`, but the page is `index, follow` |
| Redirects | **Fail** | 22 rules in `_redirects`, but 4 old URLs are unmapped, 2 of them the old site's best-ranking pages |
| Redirect chains | Pass | All targets are final URLs with trailing slashes; no hops found |
| Broken internal links | Pass | All 17 pages crawled, every internal `href` resolves to a built file |
| Structured data | Warning | Rich graph on every page; 3 stale `@id` values and no `telephone`, `geo`, hours, `image` or business `sameAs` |
| FAQ schema | Pass | 78 Q&A pairs, all derived from visible `<details>` markup, no duplicate `Question` across pages |
| Mobile friendly | Pass | Verified at 390px: no horizontal overflow on any page, responsive grids collapse to one column |
| Page speed, payload | Pass | 335 KB whole site; largest page 26 KB, one 14 KB stylesheet, 1.8 KB deferred JS |
| Render blocking | Warning | One third-party render-blocking stylesheet, Google Fonts, two families and three weights |
| LCP | Warning | LCP is text in an above-fold answer block; it waits on the Google Fonts round trip. `display=swap` is set, so the risk is layout shift rather than a blank screen |
| CLS | Warning | No dimensioned images to shift, but the webfont swap on a serif body face is the main CLS source. `size-adjust` on the fallback would remove it |
| INP | Pass | One small deferred script, one user-triggered timer, no third-party JS |
| Security headers | Pass | CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` all set |
| Caching | Pass | Immutable one-year on `/assets/*`, revalidate on HTML |
| Duplicate content | Pass | Canonicals point off the `workers.dev` preview host, so the preview cannot outrank the real site once DNS is live |
| Local SEO | **Fail** | No phone number anywhere, no `LocalBusiness` geo or hours, no Google Business Profile linked, on a keyword set where 23 of 43 terms trigger a local pack |
| Analytics | Warning | No analytics of any kind, by design. Search Console at minimum is needed to measure any of this |

---

## Competitor comparison

Semrush, US database, September 2026. `findingbalances.com` has no history, so the "Your site"
column is the old domain, which currently holds the practice's entire search footprint.

| Dimension | findingbalance­counselingpllc.com | lpctexas.com | firelight­supervision.com | trailhead­therapyatx.com | Winner |
| --- | --- | --- | --- | --- | --- |
| Organic keywords | 43 | 297 | 408 | 12 | Firelight |
| Est. organic traffic / month | 2 | 159 | 157 | 0 | lpctexas |
| Positions 1 to 3 | 0 | 3 | 14 | 0 | Firelight |
| Positions 4 to 10 | 0 | 53 | 34 | 1 | lpctexas |
| Authority Score | 5 | 8 | 19 | 2 | Firelight |
| Referring domains | 159 | 171 | 181 | 143 | Firelight, narrowly |
| Total backlinks | 289 | 706 | 401 | 527 | lpctexas |
| Content depth | 8 ranking URLs | Broad, thin | Deep supervision content | Brand only | Firelight |

Three things fall out of this table.

**Referring domains are already competitive.** 159 against 171 and 181. The practice does not
have a link problem, it has a content problem. Every one of those 159 domains has to survive
the migration, which makes the redirect map the highest-value file in the repo.

**Firelight Supervision is the model.** 408 keywords and 14 top-three positions off an
Authority Score of 19, by publishing deep supervision content rather than service pages. That
is the same bet `/texas-lpc-licensure/` makes, and it is the right one.

**Trailhead is a design reference, not an SEO competitor.** 12 keywords, essentially brand-only,
zero traffic. Worth saying plainly, since it was the look-and-feel reference for this build: do
not read its structure as a ranking strategy.

---

## Status: what was fixed on 12 September 2026

Done in the same session as this audit:

- Four missing redirects added to `src/_data/site.js`: both Somatic Experiencing blog posts to
  `/approach/`, `/mental-health-links/` to `/faq/`, `/telehealth/` to `/therapy/`. 26 rules now.
- Three stale `Service` `@id` values corrected to their nested URLs. A build-time check confirms
  every `@id` on every page now matches that page's URL.
- `/404.html` now serves `noindex, follow`, via a `noindex` front-matter flag the base layout
  honours, so any future page can opt out of indexing the same way.
- `llms.txt` no longer contains HTML entities.
- Renewal section added to `/texas-lpc-licensure/`, targeting `texas lpc license renewal` (480,
  KD 13), plus three renewal FAQs. The page is now 2,064 words and the site carries 81 FAQ
  pairs, still with no duplicate `Question` across pages. Renewal fees and late-renewal windows
  are deliberately not published, because they could not be verified against BHEC directly.

Still open, in priority order: DNS for `findingbalances.com`, deploying the current build, the
`og:image` decision, the Google Business Profile and local schema, and the `/approach` hub.

---

## Prioritized action plan

### Quick wins, this week

**1. Point `findingbalances.com` at the Worker and verify DNS.**
Impact: high. Effort: under an hour plus propagation. Blocks everything else.
`curl -sI https://findingbalances.com/` should return 200 before anything below matters. If the
domain is not going live yet, change `url` in `src/_data/site.js` to the `workers.dev` host in
the meantime, so canonicals and the sitemap are at least honest.

**2. Add the four missing redirects.**
Impact: high. Effort: 15 minutes. Depends on nothing.
`/exploring-the-science-behind-somatic-experiencing/` and
`/understanding-the-basics-of-somatic-experiencing-therapy/` are the old site's best-ranking
URLs. The first ranks #13 to #16 for `somatic experiencing` and its misspelling variants, the
second #32 to #34, and between them they account for half the old domain's estimated traffic.
Neither is in the map. Send both to `/approach/`, or to the NARM and SE sections once those
pages exist. Also map
`/mental-health-links/` and `/telehealth/`, both still linked from the old site's navigation.

**3. Fix the three stale JSON-LD `@id` values.**
Impact: medium. Effort: 10 minutes.
`/lpc-supervision#service`, `/emdr-consultation#service` and `/retreats-training#service` in
front matter still use the pre-hub flat URLs.

**4. Set the 404 page to `noindex`.**
Impact: medium. Effort: 15 minutes, needs a small layout change to honour a front-matter flag.

**5. Fix the HTML entities in `llms.txt`.**
Impact: medium for AEO, low for search. Effort: 5 minutes.
A file written for machines to read as plain text should not contain `&#39;`.

**6. Resolve the `og:image` mismatch.**
Impact: medium. Effort: 30 minutes if downgrading the card, half a day with a real image.
Every share link currently renders without a preview image while claiming a large-image card.

**7. Add the Texas LPC renewal section to the licensure guide.**
Impact: high. Effort: 1 to 2 hours. The single highest-volume winnable term at 480 a month,
KD 13, and the page that would carry it already ranks on depth.

**8. Deploy.**
Impact: high. Effort: minutes. The four `/therapy/` child pages are built and committed but not
live on the Worker.

**9. Verify in Search Console.**
Impact: high, because nothing here is measurable without it. Effort: 30 minutes. Submit the
sitemap, and add Bing Webmaster Tools at the same time.

### Strategic investments, this quarter

**1. Build the `/approach` hub, the way `/therapy` was just built.**
Children: NARM, EMDR, IFS-informed EMDR. Impact: high. Effort: multi-day.
This recovers the old site's only real ranking asset and targets `narm therapy` at 1,000 a
month, KD 15, plus the qualified EMDR commercial terms. The pattern, the templates and the
schema are already in the repo, so this is content work rather than engineering.
Depends on: nothing.

**2. Write the EMDR certification guide.**
Impact: high. Effort: multi-day, and the facts need checking against current EMDRIA rules the
same way the LPC guide was checked against 22 TAC 681.
This is the licensure-guide play applied to the other credential, feeding
`/for-therapists/emdr-consultation/`, which is currently the thinnest service page on the site
and points at a KD 5 term.

**3. Claim and populate the Google Business Profile, and complete the local schema.**
Impact: high. Effort: half a day plus verification time.
23 of 43 keywords in this space trigger a local pack. The site currently has no phone number,
no geo coordinates, no opening hours and no business `sameAs`. Name, address and credentials
must match exactly across the site, the profile, Psychology Today, EMDRIA and NARM.
Depends on: deciding whether to publish a phone number at all, which the README already flags
as an open question.

**4. Fix the entity graph.**
Impact: medium. Effort: 2 hours once the URLs exist.
Replace the Psychology Today search URL with the real profile, add the EMDRIA consultant
directory and NARM directory listings to `sameAs`, and add `image` once a portrait exists.
Inconsistent entity data is the most common reason a practice fails to get cited by answer
engines, which is the stated goal of the AEO work already done here.

**5. Self-host the two font families.**
Impact: medium for Core Web Vitals, and it removes the one third-party request on the site.
Effort: 2 hours. The README already documents how.

**6. Decide on equine as a destination, and on EMDR intensives as a service.**
Impact: medium. Effort: half a day each, once the business question is settled.
`equine therapy austin` at KD 15 and `emdr intensive` at 260 a month, KD 9, are both cheap to
rank for and neither has a home. The second is a business decision before it is an SEO one.

**7. Publish the missing trust pages.**
Impact: medium, and partly compliance rather than SEO. Effort: varies.
Privacy policy, Good Faith Estimate under the No Surprises Act, and the associate roster. The
roster matters most: the positioning routes most client enquiries to associates, and the page
currently shows a placeholder card.
