# Pre-launch open items

**Site:** findingbalancepllc.daveg-689.workers.dev → reemglascolpc.com
**Swept:** 2026-10-28, all 29 pages plus `src/_data/site.js`, `src/_headers`, the redirect table and the asset folders.

Method: every `Note for the site build` block, every "to be confirmed" row, every empty config value, every referenced file that does not exist, every redirect target, every external link, and a cross-page consistency check on the figures the site quotes.

---

## A. Blockers — the site should not go live with these

### A1. The domain does not serve
`reemglascolpc.com` returns nothing. Every one of the 29 pages canonicals to it, the sitemap lists 29 URLs on it, and `robots.txt` points its `Sitemap:` line there. Until DNS points at the Worker, a crawler that finds the preview is sent to dead URLs.

### A2. Cloudflare is building the production build onto the preview host
The Workers Builds command is `npm run build`, which emits `index, follow` and canonicals to the canonical domain. It needs to be `npm run build:preview` while the site lives on workers.dev, then switched back on launch day. Setting `SITE_URL` in Cloudflare will not work — `scripts/build.mjs` line 18 deliberately deletes it on a production build.

### A3. "Email Reem" sends clients to the supervision inbox
`src/_includes/partials/cta-band.njk` is included on **21 pages**, including every therapy page — trauma, anxiety, depression, walk and talk, equine, associates, the approach pages and the book pages. Its second button is:

```njk
<a class="cta cta--quiet" href="mailto:{{ site.emailSupervision }}">Email Reem</a>
```

`emailSupervision` is `reemglasco@gmail.com`. So a prospective therapy client reading the trauma page and clicking "Email Reem" writes to the supervision address, which is a personal Gmail, rather than to `info@findingbalancecounselingpllc.com`.

Two separate problems: enquiries land in the wrong inbox, and a personal Gmail is the wrong intake channel for anything a distressed client might write. The therapist-facing pages are the only ones where this button is correct as it stands.

### A4. The associate fee range contradicts the roster, and contradicts itself
The site quotes **"$100 to $165"** in seven places: `/therapy/` (×3), `/contact/client-portal/`, `/contact/appointment/`, `/faq/`, and `/therapy/associates/` line 17.

The roster on that same page lists:

| Associate | Fee |
|---|---|
| Nica Ayala | $100 |
| Sylvia Earl | $125 |
| Natasha Mahesh | $130 |
| Sheila Singh | $145 |
| Heather Johnston | $150 |
| Emmy Laursen | *Ask in the consult* |

Nobody is listed at $165. And `/therapy/associates/` line 214 states **"$100 to $150"** — the same page gives two different ranges, 200 lines apart.

Either $165 is Emmy's unpublished fee and her row should say so, or the range is stale and should read $100 to $150 everywhere.

### A5. Insurance — five unanswered rows on the question clients ask first
On `/faq/`, inside "Is Finding Balance Counseling in network with Blue Cross Blue Shield?":

- In network or out of network — *To be confirmed*
- Plans covered — *To be confirmed*
- What you pay — *To be confirmed*
- The associates — *To be confirmed*
- (Blue Cross Blue Shield — Accepted ✓)

These are deliberately visible rather than hidden so they do not get forgotten. "Is this covered and what will it cost me" is the first question a prospective client has, and right now the honest answer on the page is "ask in the consult."

### A6. The five intake PDFs and the privacy policy do not exist
`src/assets/forms/` is empty. Referenced but missing:

```
client-intake.pdf
client-information.pdf
limits-of-confidentiality.pdf
good-faith-estimate.pdf
authorization-for-release-of-information.pdf
privacy-policy.pdf
```

They are still on the old WordPress site under `/wp-content/uploads/`. The page degrades gracefully — it tells people the forms come by email, which is true and not a dead link — so this is a blocker for client experience rather than for the build. Drop the files into `src/assets/forms/` under those exact names and each row becomes a download on the next build.

Note: the Good Faith Estimate is a No Surprises Act requirement for self-pay clients. That one is not optional.

---

## B. Needs an answer from Reem

Thirteen `Note for the site build` blocks are live on the site. They render as small grey notes and are visible to any visitor, so they should be resolved or removed before launch either way.

| # | Page | What is needed |
|---|---|---|
| B1 | `/for-therapists/lpc-supervision/` | **Is supervision 4+1 or 3+1?** The old site said both in different places. This build uses four individual plus one group, five hours a month, throughout. If it is four hours in total, the fee framing and the compliance-margin argument both need rewriting. |
| B2 | `/therapy/associates/` | Approve the roster. It was rebuilt from the old site, where several associate pages carried one person's name on another's URL and three were placeholders. Each associate should sign off on their own paragraph, fee and contact route. |
| B3 | `/therapy/equine/` | The client session fee and session length. The $60 on the page is the *supervision* rate for associates, not the client rate — the two must not be conflated on a public page. |
| B4 | `/for-therapists/ethics-ceus/` | Next dates, the fee, and the §681.140(f) approved-provider status. Until the provider status is stated, an LPC cannot tell whether these hours count toward their required half, which is the first thing they check. Also needs a registration route rather than an email button. |
| B5 | `/for-therapists/retreats-training/` | Next retreat date, the equine training format and fee, the next ethics CEU offering, and a registration route. |
| B6 | `/book/` | Format (paperback or otherwise) and page count, for the `Book` schema in the front matter. |
| B7 | `/about/` | **A head-and-shoulders photograph of Reem.** The page currently uses a watercolor from her book. The new photo with Blu works on the home page but is 320×400, too small to carry the About page, and it is a full-body shot rather than a portrait. |
| B8 | `/blog/` | More posts. One real article carried over; eleven of the old site's fourteen were 40–130 words or "coming soon" announcements from 2022–23 and were deliberately not migrated. |
| B9 | `/faq/` | Link the privacy policy and Good Faith Estimate once they are on the new domain (see A6). |
| B10 | `/therapy/associates/` | Emmy Laursen has no fee stated — "Ask in the consult" in both the fee and sliding-scale columns. She is the only associate without a published rate, and possibly the source of the $165 in A4. |

---

## C. Configuration — one-line fixes once the answers exist

| Setting | Current | Effect |
|---|---|---|
| `site.phone` | `""` | Site stays email-only. Set it and the number appears on `/contact/`, in the footer and in the `MedicalBusiness` schema. Needed for local search — see D3. |
| `site.portal.url` / `.name` | `""` | **Every portal button on the site is inert.** The client portal page, the forms page and the contact page all show "Ask for your portal link" instead of a direct login link. Set both and all of them become real links; the CSP needs no change for a plain link, only if the portal is ever framed. |
| `site.psychologyToday` | a *search query* URL | `psychologytoday.com/us/therapists?search=reem+glasco` is a search results page, not her profile. It is used as the `sameAs` in the schema, where a search URL is close to useless for entity reconciliation, and as a link in the footer. Replace with the canonical profile URL. |

---

## D. Decisions already taken, worth a second look

These are not defects. They are choices, and launch is the moment to confirm them.

**D1. The home page sells supervision, not therapy.** Title, H1 and five of seven H2s target therapists looking for an LPC-S. A therapy client landing on the front door gets one aside: "Looking for a therapist rather than a supervisor?" Supervision and therapy are two businesses competing for one H1, and no amount of tag work resolves it.

**D2. The blog is not in the header navigation.** `blog.njk` carries `inNav: false`, so `/blog/` is reachable only from the footer and from the two editorial links added on `/therapy/` and `/about/`. Reasonable while it holds one post; worth revisiting once B8 is done.

**D3. No local entity.** The schema has no `telephone`, no `streetAddress`, no `geo`, no opening hours, and no Google Business Profile. "therapist cedar park" is 90 searches a month at difficulty 13 with a $14.69 CPC — the CPC is the tell that the traffic converts. If the practice is deliberately online-only with no public office, the fix is not to add an address but to drop `MedicalBusiness` for service-area markup and compete for "online therapy texas" (590/mo) instead. **This is Reem's call, not a bug.**

**D4. `dist/` is committed to git.** Since the cache-busting hash lives in every page's `<head>`, any CSS change rewrites all 29 HTML files. A one-line CSS edit shows up as a 30-file diff. Cloudflare rebuilds from source on push, so `dist/` does not need to be tracked at all.

**D5. Fees were merged into the FAQ.** `/fees/` now 301s to `/faq/`. The cost is one fewer URL targeting cost queries; the benefit is that the topic is no longer split. Low risk given the old site's fees page only ever reached #76 for "sliding scale therapy austin".

---

## What is already clean

So nobody re-checks these:

- 29 pages, zero broken internal links
- 38 redirects, every target resolves
- 171 FAQ questions marked up, zero duplicates, zero mismatches between schema and visible text
- 29/29 unique titles, all under 60 characters; all descriptions between 70 and 160
- 29/29 exactly one H1
- Every image loads, none upscaled, all have alt text
- WCAG AA contrast passes on every sampled text pair
- Mobile LCP 350–410ms, CLS 0
- GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot and Google-Extended explicitly allowed
- 911 leads every crisis line; no page names 988 without 911 beside it
- No page still references the retired `/fees/` URL
- The only old-domain references left are the `info@findingbalancecounselingpllc.com` mailto addresses, which are intentional
