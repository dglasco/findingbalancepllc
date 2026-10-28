# SEO Audit: Full Site

**Site:** findingbalancepllc.daveg-689.workers.dev → reemglascolpc.com
**Scope:** All 29 pages, both audiences. Yesterday's audit covered the 24 client-facing pages; this one adds the six therapist-facing pages that were excluded then, and re-checks the client side after the Fees → FAQ merge.
**Date:** 2026-10-28
**Keyword data:** Semrush, US database, pulled 2026-10-28.

Yesterday's therapy-side keyword research still stands and is not repeated here — see `claude/seo-audit-2026-10-therapy.md` for the 40-keyword client table. **The new ground in this audit is the supervision and consultation side, which has never been researched.**

---

## Executive summary

The site is in better technical shape than when it was last audited: 29 pages, 26,703 words, zero broken links, zero schema parse failures, all 29 titles unique and under 60 characters, every description between 127 and 160, exactly one H1 per page, mobile LCP between 284ms and 476ms with CLS of 0 everywhere. The Fees → FAQ merge landed cleanly and is live.

Three things need attention, in order:

1. **The supervision page advertises a different service in its search snippet than in its body.** Its meta description and its Service schema both say "three individual hours and one group hour." Its body copy says four. This is live.
2. **The therapist-facing side is 22% of the site's words and has never been optimized.** It contains the single highest-volume term the practice could plausibly compete for, and its most commercially valuable page is the thinnest page on the site.
3. **The preview is still publishing an indexable production build** that canonicals to a domain that does not serve. Unchanged since yesterday.

Overall: **strong foundation, one live factual contradiction, one unworked audience.**

---

## 1. The supervision structure contradicts itself, on the pages that sell it

Eleven statements across the site describe what $425 a month buys. **Eight say four individual hours plus one group. Three say three.**

The three that say three are the worst three places for it to be wrong:

| File | Line | What it is | Says |
|---|---|---|---|
| `for-therapists/lpc-supervision.njk` | 5 | **meta description** — the search result snippet | three |
| `for-therapists/lpc-supervision.njk` | 9 | **JSON-LD `Service` description** — structured data | three |
| `faq.njk` | 75 | **the price table row**, carried in during the Fees merge | three |

Meanwhile the same supervision page's body copy says four, twice, and the FAQ's own body says four, three times, 300 lines below the table that says three.

So:

- Google's snippet for the supervision page will advertise three hours. The page a supervisee lands on will say four.
- The structured data describing the service says three.
- The FAQ states both, on one page.

The build note on that very page claims *"this build uses four plus one throughout."* That is not true — its own front matter is one of the three exceptions.

This is a factual claim about a paid professional service, stated inconsistently in exactly the two places machines read most literally. It should be fixed before anything else in this audit. **Severity: critical.**

It is also still an open question for Reem (item B1 in `claude/pre-launch-open-items.md`) — but whichever answer is right, the site should not be saying both.

---

## 2. Keyword opportunities: the therapist-facing side

Never researched before today. Volume and KD are Semrush, US database.

| Keyword | Vol/mo | KD | Intent | Current page | Opportunity |
|---|---|---|---|---|---|
| texas behavioral health executive council | 2,900 | 21 | Navigational | `/texas-lpc-licensure/` mentions it | **High** |
| emdr certification | 1,900 | 24 | Informational | `/for-therapists/emdr-consultation/` | **High** |
| emdr consultation | 390 | 27 | Informational | `/for-therapists/emdr-consultation/` | **High** |
| emdr certification requirements | 390 | 14 | Informational | **not targeted** | **High** |
| texas lpc renewal | 260 | 18 | Informational | `/texas-lpc-licensure/` ✓ | **High** |
| emdria approved consultant | 170 | 28 | Informational | `/for-therapists/emdr-consultation/` | **High** |
| texas lpc requirements | 140 | 27 | Informational | `/texas-lpc-licensure/` ✓ | Medium |
| how to become an lpc in texas | 90 | 29 | Informational | `/texas-lpc-licensure/` ✓ | Medium |
| **online lpc supervision** | 90 | **0** | Commercial | `/for-therapists/lpc-supervision/` | **High** |
| emdr consultant | 70 | 21 | Informational | `/for-therapists/emdr-consultation/` | **High** |
| lpc supervision | 50 | 24 | Informational | `/for-therapists/lpc-supervision/` | Medium |
| lpc supervisor | 50 | 0 | — | `/for-therapists/lpc-supervision/` | **High** |
| texas lpc license requirements | 50 | 28 | Informational | `/texas-lpc-licensure/` ✓ | Medium |
| what states have lpc reciprocity with texas | 50 | 19 | — | **not covered** | **High** |
| lpc supervisor texas | 20 | 0 | — | `/for-therapists/lpc-supervision/` | **High** |
| lpc associate texas | 20 | 0 | — | `/therapy/associates/` | Medium |
| lpc associate supervision requirements | 20 | 0 | — | `/texas-lpc-licensure/` ✓ | Medium |
| how much does lpc supervision cost | 20 | 0 | — | `/texas-lpc-licensure/` ✓ | Medium |
| how do i become an lpc supervisor in texas | 20 | 0 | — | `/texas-lpc-licensure/` partial | Medium |
| can lpc associates bill insurance in texas | 20 | 0 | — | **not covered** | Medium |
| how much do lpc associates make in texas | 20 | 0 | — | **not covered** | Low |
| can an lpc diagnose in texas *(5 near-variants)* | 20 ea | 0 | — | **not covered** | Medium |

**Returned zero volume** — worth knowing so nobody optimizes for them: `lpc supervision austin`, `lpc supervision cost`, `find lpc supervisor texas`, `lpc ceu texas`, `emdr consultation hours`, `lpc supervisor requirements texas`, `licensed professional counselor supervisor`. Semrush held no data at all for `lpc associate hours texas`, `counseling supervision texas`, `counseling supervision austin`, `ethics ceu texas lpc`, `3000 hours lpc texas`, `lpc supervision group`.

Two things stand out.

**`online lpc supervision`, 90/mo at difficulty 0.** Nothing else on this site combines that much commercial intent with that little competition. Reem's entire supervision offer is online and statewide. The page does not use the phrase in its title.

**`texas behavioral health executive council`, 2,900/mo.** That is the highest-volume term anywhere in the practice's reach, higher than anything on the therapy side except `narm` (4,400). It is navigational — people looking for the regulator — but `/texas-lpc-licensure/` is a 2,064-word guide built on BHEC rules, and "what the BHEC actually requires, in plain English" is a legitimate answer to that search.

---

## 3. Competitor reality on the B2B side

This matters more than the keyword table, because it changes what is worth attempting.

**`emdr consultation` top 10:** emdrconsulting.com, **emdria.org (three separate results)**, instituteforcreativemindfulness.com, ticti.org, emdr.com, coasttocoastemdr.com, scalingupemdr.com, gaemdrnetwork.com.

**`texas lpc requirements` top 10:** **bhec.texas.gov (three separate results)**, txca.org, a Texas A&M course catalog, psychology.org, ccfam.com, onlinececredits.com, onlinecounselingprograms.com, counselingtexas.org.

Both SERPs are owned by **institutions, not practices**: the certifying body, the state regulator, universities, and national training organizations. `bhec.texas.gov` sits on texas.gov, which carries 148,476 organic keywords and roughly 51,000 monthly visits.

A solo supervisor is not going to outrank the State of Texas for "texas lpc requirements," and no amount of content will change that. The honest read:

- **Head terms on the B2B side are not winnable.** Do not plan around them.
- **The long tail is wide open.** Almost every "can an LPC…", "how do I…", "how much do…" question returned difficulty 0. Institutions write regulations; they do not write "the supervision rules associates get wrong."
- **Directory listings are the realistic route to the commercial terms.** EMDRIA's own consultant directory ranks on page one for `emdr consultation`. Being in it is worth more than any page Reem could write.

---

## 4. On-page issues

| Page | Issue | Severity | Fix |
|---|---|---|---|
| `/for-therapists/lpc-supervision/` | Meta description and `Service` schema say three individual hours; body says four | **Critical** | Settle the structure, then make all eleven statements agree |
| `/faq/` | Price table says three individual hours; body says four, 300 lines apart | **Critical** | Same |
| All 29 pages (live) | `index, follow` + canonical to a host that does not serve | **Critical** | Cloudflare build command → `npm run build:preview` |
| `/for-therapists/emdr-consultation/` | **389 words — the thinnest page on the site** — yet it targets `emdr certification` (1,900/mo), `emdr consultation` (390), `emdria approved consultant` (170) and `emdr consultant` (70) | **High** | Expand to 900+. It has 7 inbound links already, more than most. |
| `/for-therapists/lpc-supervision/` | Title is 45 characters, the shortest on the site; does not contain "online", which is a difficulty-0 qualifier | **High** | e.g. "Online LPC Supervision in Texas \| Reem Glasco, LPC-S" (52) |
| `/for-therapists/ethics-ceus/` | **Zero editorial inbound links.** Nothing on the site links to it from body copy | **High** | Link from `/for-therapists/`, `/texas-lpc-licensure/` and `/for-therapists/retreats-training/` |
| `/for-therapists/` | One editorial inbound link, and it comes from `/book/` | Medium | The hub should be linked from the pages beneath it |
| `/texas-lpc-licensure/` | Does not cover reciprocity, diagnosis scope, associate billing or associate pay — all difficulty 0 | Medium | Add four accordions |
| `/blog/` | 267 words, one post, still `inNav: false` | Medium | See `pre-launch-open-items.md` B8 |
| `/contact/` | 253 words | Low | Utility page; acceptable |
| `/therapy/walk-and-talk/` | 256KB page weight after the new photographs, vs 41–70KB elsewhere | Low | LCP still 392ms, so cosmetic. Worth watching if more images land. |

---

## 5. Content gaps

| Gap | Why | Format | Priority | Effort |
|---|---|---|---|---|
| Expand the EMDR consultation page | 389 words against 2,460/mo of combined EMDR-certification intent, on a page that already has 7 inbound links | Rewrite in place | **High** | Half day |
| "What does the EMDRIA certification pathway actually require?" | `emdr certification requirements` 390/mo KD 14, untargeted | Accordion or section on the consultation page | **High** | Quick win |
| Target `online lpc supervision` | 90/mo at **KD 0**, exactly what Reem sells, not in the title | Title + H1 rework | **High** | Quick win |
| LPC reciprocity with Texas | 50/mo KD 19, not covered anywhere | Accordion on the licensure guide | **High** | Quick win |
| The "can an LPC…" cluster | 5+ variants at 20/mo each, all KD 0, institutions do not answer these | Four accordions on the licensure guide | Medium | Quick win |
| A BHEC plain-English explainer | 2,900/mo navigational; the guide already contains the substance | Section + internal linking | Medium | Moderate |
| Grief page *(carried from yesterday)* | `grief counseling austin` 260/mo KD 16 | Child page under `/therapy/` | **High** | Half day |
| Online therapy in Texas *(carried from yesterday)* | 680/mo combined, untargeted | Landing page | **High** | Moderate |

---

## 6. Technical SEO

| Check | Status | Detail |
|---|---|---|
| HTTPS | **Pass** | |
| Mobile LCP | **Pass** | 284–476ms across six pages |
| CLS | **Pass** | 0.0000 everywhere |
| Page weight | **Pass** | 41–70KB; walk-and-talk 256KB after the photographs |
| Requests | **Pass** | 3–4 per page |
| Broken internal links | **Pass** | Zero across 29 pages |
| Redirects | **Pass** | 38 defined, every target resolves |
| Titles | **Pass** | 29/29 unique, 45–59 characters |
| Meta descriptions | **Pass** | 29/29 unique, 127–160 characters |
| H1 | **Pass** | Exactly one per page |
| Image alt text | **Pass** | All present and descriptive |
| JSON-LD validity | **Pass** | Zero parse failures across 29 pages |
| FAQ schema integrity | **Pass** | 171 questions, zero duplicates, zero schema/visible mismatches |
| Asset cache-busting | **Pass** | `?v=` content hash now on CSS and JS |
| AI crawler access | **Pass** | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended allowed |
| Crisis information | **Pass** | 911 leads every crisis line; no page names 988 without 911 |
| **Preview indexability** | **Fail** | Live preview still serves `index, follow` |
| **Canonical target** | **Fail** | All 29 canonicals point at `reemglascolpc.com`, which does not serve |
| **Sitemap target** | **Fail** | Same host |
| **Local entity** | **Fail** | No `telephone`, no `streetAddress`, `sameAs` is a search URL |
| `/for-therapists/ethics-ceus/` | **Warning** | Zero editorial inbound links |
| Render-blocking | **Warning** | Google Fonts stylesheet; `preconnect` and `display=swap` present, which is the right mitigation |

---

## 7. Where the two sides stand

| Dimension | Client side | Therapist side |
|---|---|---|
| Pages | 23 | 6 |
| Words | 20,829 | 5,874 |
| Share of site | 78% | 22% |
| Keyword research done | Yes (2026-10-27) | **First time today** |
| Highest-volume reachable term | `narm` 4,400 | `texas behavioral health executive council` 2,900 |
| Best difficulty-0 opportunity | `is emdr covered by insurance` 320 | `online lpc supervision` 90 |
| SERP character | Local practices, beatable | Institutions, head terms not winnable |
| Thinnest page | `/blog/` 267w | `/for-therapists/emdr-consultation/` 389w |
| Homepage targets this audience | No | Yes |

The homepage points entirely at the therapist side, which is 22% of the site. That remains the largest strategic question on the site and is unchanged from yesterday's audit.

---

## 8. Action plan

### Quick wins (this week)

| Action | Impact | Effort |
|---|---|---|
| Fix the three "three individual hours" statements so all eleven agree | **High** | 15 min once Reem confirms |
| Cloudflare build command → `npm run build:preview` | **High** | 5 min |
| Retitle the supervision page to include "Online" | **High** | 5 min |
| Add "What does EMDRIA certification require?" to the consultation page | **High** | 20 min |
| Add an LPC reciprocity accordion to the licensure guide | **High** | 20 min |
| Link `/for-therapists/ethics-ceus/` from three sibling pages | **High** | 10 min |
| Add the four "can an LPC…" accordions | Medium | 40 min |
| Link `/for-therapists/` from the pages beneath it | Medium | 10 min |

### Strategic (this quarter)

| Action | Impact | Effort | Depends on |
|---|---|---|---|
| **Get listed in the EMDRIA consultant directory.** It ranks page one for `emdr consultation`; that listing is worth more than any page on this site | **High** | 1–2 hours | Reem's EMDRIA account |
| Expand `/for-therapists/emdr-consultation/` from 389 to 900+ words | **High** | Half day | — |
| Resolve the homepage audience split | **High** | Half day | Reem's call |
| Point the domain | **High** | Half day | DNS |
| Add a grief page *(carried)* | **High** | Half day | Whether the practice does this work |
| Build the online-therapy angle *(carried)* | **High** | Half day | — |
| Decide the local-entity question *(carried)* | **High** | Half day | Reem's call |
| Push on NARM *(carried)* — old site hit #22 for a 5,400/mo term with no authority | **High** | Multi-day | — |
| Search Console + GBP on the new domain from day one | **High** | 1 hour | Domain |

---

## Caveats

- Volume and difficulty are Semrush US database, pulled 2026-10-28. KD 0 means "no measurable difficulty," not "guaranteed ranking," and on 20/mo terms the absolute upside is small — their value is cumulative and as evidence of expertise.
- `bhec.texas.gov` resolved to `texas.gov` in Semrush, so the 148,476 keyword figure is the whole state domain, not the agency subsite. The conclusion — that it cannot be outranked — holds either way.
- Semrush returned no data for six supervision-related terms. No data means Semrush holds none, not that volume is zero.
- The therapy-side keyword table is not reproduced here; see `claude/seo-audit-2026-10-therapy.md`, which remains current.
- `reemglascolpc.com` could not be fetched from this session. Confirm its status directly.
