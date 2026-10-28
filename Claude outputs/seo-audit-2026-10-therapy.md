# SEO Audit: Therapy Side
**Site:** findingbalancepllc.daveg-689.workers.dev (preview) → reemglascolpc.com (planned)
**Scope:** Client-facing therapy pages. The 5 therapist-facing pages (`/for-therapists/*`, `/texas-lpc-licensure/`) are excluded except where they compete with therapy pages.
**Date:** 2026-10-28
**Keyword data:** Semrush, US database, pulled 2026-10-28.

---

## Executive summary

The therapy pages are, on the merits, strong: 24 pages averaging 850 words, every page with a unique title inside 48–59 characters, a unique meta description, exactly one H1, zero broken internal links, and **167 FAQ questions marked up with zero duplicates and zero mismatches between schema and visible text**. Mobile LCP is 350–410ms with CLS of 0. That is a better technical foundation than any of the five Austin competitors I pulled.

Three things are holding it back, in order of severity:

1. **The homepage sells supervision, not therapy.** Title, H1 and five of seven H2s are aimed at therapists looking for an LPC-S. The highest-authority page on the site routes therapy clients away in a single "Looking for a therapist rather than a supervisor?" aside.
2. **The live preview is publishing a production build.** It serves `index, follow`, canonicals to `reemglascolpc.com`, and a sitemap of 30 URLs on that host — which does not currently serve. Google can crawl the preview, follow the canonicals, and find nothing.
3. **No local entity.** The schema has no `telephone`, no `streetAddress`, and a `sameAs` that points at a Psychology Today *search query* rather than a profile. For "therapist cedar park" (90/mo, KD 13, $14.69 CPC) that is the difference between competing and not appearing.

Overall: **strong foundation, two self-inflicted wounds.** The old site ranks for 26 keywords and ~6 organic visits a month, so there is nothing to lose in the migration and everything to build.

---

## Where the practice stands

| Domain | Organic keywords | Est. monthly organic traffic |
|---|---|---|
| justmind.org | 5,563 | 12,605 |
| emdrtherapyaustin.com | 803 | 1,026 |
| atxtraumatherapycenter.com | 725 | 1,066 |
| **findingbalancecounselingpllc.com** (old site) | **26** | **~6** |

The old site's 26 keywords are worth knowing because they show where the practice already has a toehold. Nearly all of them sit on two pages:

- `/narm-neuroaffective-relational-model/` ranks #22 for **narm** (5,400/mo), #32 for **narm therapy** (1,000/mo), #21 for **neuroaffective relational model** (260/mo), #33 for **what is narm therapy**
- `/exploring-the-science-behind-somatic-experiencing/` ranks #92 for **somatic experiencing** (4,400/mo), #97 for **does somatic experiencing work**, #78 for **trauma somatic experience** (590/mo)

Three of the 26 are junk — the associate bio page ranks for **morrice michigan**, **morrice morris** and **morrice hardware** on a name collision.

**The NARM position is the asset.** Page 2–3 rankings on a 5,400/mo head term from a site with no authority means the topic is wide open. The new `/approach/narm/` page is 1,005 words and already answers "What is NARM therapy?" — it should be the first page to get links pointed at it.

---

## Keyword opportunities

Sorted by opportunity. Volume and KD are Semrush, US database.

| Keyword | Vol/mo | KD | Intent | Current page | Opportunity |
|---|---|---|---|---|---|
| narm therapy | 1,000 | 15 | Commercial | `/approach/narm/` | **High** |
| narm | 4,400 | 27 | Commercial | `/approach/narm/` | **High** |
| emdr therapy austin | 590 | 17 | Informational | `/approach/emdr/` | **High** |
| online therapy texas | 590 | 23 | Informational | none targeted | **High** |
| developmental trauma therapy | 480 | 15 | Informational | `/therapy/trauma/` | **High** |
| how long does emdr therapy take | 390 | 12 | — | `/faq/` ✓ answered | **High** |
| is emdr covered by insurance | 320 | 0 | Informational | `/approach/emdr/` ✓ | **High** |
| trauma therapy austin | 320 | 30 | Informational | `/therapy/trauma/` | **High** |
| grief counseling austin | 260 | 16 | Informational | **no page** | **High** |
| somatic therapy austin | 210 | 10 | Informational | `/approach/somatic-experiencing/` | **High** |
| what's emdr therapy | 260 | 7 | — | **not answered** | **High** |
| is emdr somatic therapy | 170 | 1 | — | `/faq/` ✓ answered | **High** |
| neuroaffective relational model | 260 | 39 | Informational | `/approach/narm/` | Medium |
| anxiety therapy austin | 260 | 39 | Informational | `/therapy/anxiety/` | Medium |
| emdr therapist austin | 140 | 16 | Commercial | `/approach/emdr/` | **High** |
| therapist georgetown tx | 140 | 20 | Informational | **no page** | Medium |
| how long is emdr therapy | 140 | 15 | — | `/faq/` ✓ | Medium |
| narm therapists | 110 | 13 | Commercial | `/approach/narm/` | **High** |
| what is narm | 110 | 3 | Informational | `/approach/narm/` ✓ | **High** |
| equine therapy austin | 110 | 15 | Informational | `/therapy/equine/` | **High** |
| trauma therapist austin | 110 | 29 | Informational | `/therapy/trauma/` | Medium |
| does insurance cover emdr therapy | 110 | 0 | — | `/approach/emdr/` ✓ | **High** |
| is emdr therapy covered by insurance | 110 | 0 | — | `/approach/emdr/` ✓ | **High** |
| a.r.t. therapy vs emdr | 110 | 7 | — | **not answered** | Medium |
| anxiety therapist austin | 110 | 54 | Informational | `/therapy/anxiety/` | Low (hard) |
| therapist cedar park | 90 | 13 | Informational | `/about/`, `/contact/` | **High** |
| what is narm therapy | 90 | 11 | Informational | `/approach/narm/` ✓ | **High** |
| online therapist texas | 90 | 16 | Commercial | none targeted | **High** |
| therapist round rock tx | 90 | 22 | Informational | **no page** | Medium |
| counseling round rock | 90 | 23 | Informational | **no page** | Medium |
| how much does emdr therapy cost | 90 | 0 | — | **not answered** | **High** |
| how much is emdr therapy | 90 | 0 | — | **not answered** | **High** |
| self care workbook | 90 | 0 | Transactional | `/book/` | Medium |
| depression therapist austin | 70 | 26 | Informational | `/therapy/depression/` | Medium |
| therapist cedar park tx | 70 | 30 | Informational | `/about/` | Medium |
| emdr therapist texas | 50 | 2 | Informational | `/approach/emdr/` | **High** |
| emdr vs somatic experiencing | 40 | 0 | Informational | `/approach/somatic-experiencing/` ✓ | **High** |
| ifs therapist austin | 30 | 1 | Commercial | `/approach/ifs-informed-emdr/` | Medium |
| horse therapy texas | 30 | 0 | — | `/therapy/equine/` | Medium |
| somatic experiencing austin | 20 | 0 | — | `/approach/somatic-experiencing/` | Medium |

**Worth knowing: `walk and talk therapy austin` returns 0 volume.** The `/therapy/walk-and-talk/` page is a differentiator and a conversion asset, but it will not bring traffic on its head term. Keep it; do not invest in optimizing it for search.

---

## On-page issues

| Page | Issue | Severity | Fix |
|---|---|---|---|
| `/` | Title, H1 and 5 of 7 H2s target LPC supervision. No therapy keyword in the title. | **Critical** | Either rewrite the homepage for a split audience, or accept it and make `/therapy/` the therapy entry point with external links pointed there. |
| All 30 pages (live) | `index, follow` + canonical to a host that does not serve | **Critical** | Deploy with `npm run deploy:preview`, not `npm run deploy`. |
| `/approach/emdr/` | Never answers "What is EMDR therapy?" — the 27,100/mo head term, and `what's emdr therapy` at 260/mo KD 7 | **High** | Add it as the first accordion. |
| `/approach/emdr/` | No EMDR-specific cost question. `how much does emdr therapy cost` + `how much is emdr therapy` = 180/mo at **KD 0** | **High** | Add "How much does EMDR therapy cost?" |
| `/approach/somatic-experiencing/` | Never answers "What is Somatic Experiencing?" (720/mo, though KD 75) | **High** | Add it as the first accordion. |
| `/therapy/` | H1 "Therapy at Finding Balance" carries no keyword, while the title does | **High** | "Trauma, anxiety and depression therapy in Texas" or similar. |
| `/` schema | `MedicalBusiness` has no `telephone`, no `streetAddress`, no `geo`, no `openingHoursSpecification` | **High** | See local-entity section below. |
| `/` schema | `sameAs` points to a Psychology Today **search URL**, not a profile | **High** | Replace with the canonical profile URL; add Google Business Profile, EMDRIA directory, NARM directory. |
| `/blog/` | Zero editorial inbound links — reachable only from nav | Medium | Link from `/therapy/` and `/about/`. |
| `/blog/` | 267 words, one post | Medium | Three more posts before this earns crawl priority. |
| `/fees/` | Zero editorial outbound links — 9 pages link in, nothing links out | Medium | Add links to `/therapy/`, `/contact/appointment/`, `/therapy/associates/`. |
| `/about/` | 401 words, the thinnest therapy-side page, and the main E-E-A-T surface | Medium | Expand to 700+: training lineage, who she works with, why NARM/SE/EMDR. |
| `/contact/` | 252 words with one H2 | Medium | Thin, but it is a utility page. Low priority. |
| `/therapy/trauma/` | Only 3 editorial inbound links; anchor text is 30× "Trauma" from nav | Medium | Vary editorial anchors: "developmental trauma", "C-PTSD therapy". |
| 4 pages | Meta descriptions 162–163 chars (will truncate) | Low | `/approach/narm/`, `/approach/somatic-experiencing/`, `/contact/forms/`, `/contact/` |

---

## The local entity problem

Everything else on this site is done carefully, which makes this stand out. For local therapy search, Google needs to resolve "Finding Balance Counseling" to a real place. Right now it cannot:

- **No `telephone`** — `site.js` has `phone: ""`, so every schema block omits it
- **No `streetAddress`** — only `addressLocality: "Cedar Park"`
- **`sameAs` is a search query**, not a profile: `psychologytoday.com/us/therapists?search=reem+glasco`
- **No Google Business Profile referenced anywhere**

`therapist cedar park` is 90/mo at KD 13 with a $14.69 CPC — the CPC is the tell that this traffic converts. `therapist cedar park tx` adds 70/mo. Neither is winnable without a resolvable local entity.

If the practice is deliberately online-only with no public office, that is a legitimate choice, and the fix is different: drop `MedicalBusiness` in favor of service-area markup and stop competing for "cedar park" entirely, leaning on `online therapy texas` (590/mo, KD 23) and `online therapist texas` (90/mo, KD 16) instead — neither of which any page currently targets. **This is a decision for Reem, not a bug to fix.**

---

## Content gaps

| Gap | Why | Format | Priority | Effort |
|---|---|---|---|---|
| **Grief** | `grief counseling austin` 260/mo KD 16. The therapy hub covers trauma, anxiety, depression — grief is the obvious fourth and competitors all have one. | Child page under `/therapy/` | High | Moderate |
| **"What is EMDR?"** | 27,100/mo head term plus `what's emdr therapy` 260/mo KD 7. Currently unanswered. | Accordion on `/approach/emdr/` | High | Quick win |
| **EMDR cost** | 180/mo combined at **KD 0**. Zero competition. | Accordion on `/approach/emdr/` and `/fees/` | High | Quick win |
| **Online therapy in Texas** | `online therapy texas` 590/mo KD 23 + `online therapist texas` 90/mo KD 16. Mentioned everywhere, targeted nowhere. | Landing page or `/therapy/` rework | High | Moderate |
| **"What is Somatic Experiencing?"** | 720/mo. KD 75 is hard, but the question belongs on the page regardless. | Accordion | High | Quick win |
| **Nearby cities** | Round Rock 180/mo combined, Georgetown 140/mo | Location pages *only if* there is a real presence | Medium | Moderate |
| **ART vs EMDR** | `a.r.t. therapy vs emdr` 110/mo KD 7 | Accordion or short post | Medium | Quick win |
| **Blog depth** | One post. Competitors publish regularly. | 3–4 posts | Medium | Substantial |

---

## Technical SEO

| Check | Status | Detail |
|---|---|---|
| HTTPS | **Pass** | |
| Mobile LCP | **Pass** | 348–412ms across 6 pages |
| CLS | **Pass** | 0.0000 on every page |
| Page weight | **Pass** | 42–130KB, 3–4 requests |
| Broken internal links | **Pass** | Zero across 30 pages |
| Title tags | **Pass** | 30/30 unique, 48–59 chars |
| Meta descriptions | **Pass** | 30/30 unique; 4 over 160 |
| H1 | **Pass** | Exactly one per page |
| Image alt text | **Pass** | 11/11 descriptive |
| FAQ schema integrity | **Pass** | 167 Questions, 0 duplicates, 0 schema/visible mismatches |
| Schema coverage | **Pass** | MedicalBusiness, Person, Service, FAQPage, Book, Article, BreadcrumbList |
| AI crawler access | **Pass** | GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended explicitly allowed |
| Render-blocking | **Warning** | Google Fonts stylesheet is third-party render-blocking; `preconnect` and `display=swap` are present, which is the right mitigation |
| Local entity | **Fail** | No telephone, no streetAddress, `sameAs` is a search URL |
| Preview indexability | **Fail** | Live preview serves `index, follow` |
| Canonical target | **Fail** | All 30 canonicals point to `reemglascolpc.com` |
| Sitemap target | **Fail** | 30 URLs on `reemglascolpc.com`; robots.txt `Sitemap:` same |
| `/blog/` discoverability | **Warning** | No editorial inbound links |
| `/fees/` | **Warning** | Dead-end: 9 in, 0 out |

**On the deploy mismatch:** the local build is correct — `noindex, nofollow` on all 30 pages, canonicals and sitemap on the workers.dev host. The live build is not. The two differ because `npm run deploy` was used instead of `npm run deploy:preview`.

---

## Competitors

Top of SERP for `trauma therapy austin`: atxtraumatherapycenter.com, austincts.com, christyreederphd.com, justmind.org, emdrtherapyaustin.com.
For `somatic therapy austin`: deepeddypsychotherapy.com, colorsofaustincounseling.com, justmind.org, appliedsomatictherapy.com.

| Dimension | This site | justmind.org | atxtraumatherapycenter | emdrtherapyaustin | Winner |
|---|---|---|---|---|---|
| Organic keywords | 26 (old domain) | 5,563 | 725 | 803 | justmind |
| Est. organic traffic | ~6 | 12,605 | 1,066 | 1,026 | justmind |
| Modality depth | 5 dedicated pages (NARM, SE, EMDR, IFS-EMDR, hub) | Broad, shallower | Trauma-focused | EMDR only | **This site** |
| FAQ / AEO markup | 167 marked-up questions | Standard | Standard | Standard | **This site** |
| Page speed | LCP <420ms, CLS 0 | WordPress | WordPress | WordPress | **This site** |
| Differentiated offer | Equine, walk-and-talk, published book | — | — | — | **This site** |
| Local entity signals | None | Established | Established | Established | Competitors |
| Publishing cadence | 1 post | Regular | Regular | Occasional | Competitors |

The pattern: this site wins on everything Reem controls through craft, and loses on everything that accrues through time and local presence. That is the normal shape for a well-built new site, and it is the right shape to be in.

---

## Action plan

### Quick wins (this week)

| Action | Impact | Effort |
|---|---|---|
| Redeploy with `npm run deploy:preview`; confirm `noindex` with `curl -s <url> \| grep robots` | **High** | 5 min |
| Add "What is EMDR therapy?" as the first accordion on `/approach/emdr/` | **High** | 20 min |
| Add "How much does EMDR therapy cost?" to `/approach/emdr/` and `/fees/` (KD 0) | **High** | 20 min |
| Add "What is Somatic Experiencing?" to `/approach/somatic-experiencing/` | **High** | 20 min |
| Change `/therapy/` H1 to carry a keyword | **High** | 5 min |
| Replace the Psychology Today `sameAs` search URL with the real profile URL | **High** | 10 min |
| Add `telephone` to `site.js` (or decide formally against it) | **High** | 5 min |
| Trim 4 meta descriptions to ≤160 | Low | 10 min |
| Link `/blog/` from `/therapy/` and `/about/` | Medium | 10 min |
| Add 3 outbound links to `/fees/` | Medium | 10 min |

### Strategic (this quarter)

| Action | Impact | Effort | Depends on |
|---|---|---|---|
| **Resolve the homepage audience split.** Supervision and therapy are different businesses competing for one H1. | **High** | Half day | Reem's call on which audience the domain leads with |
| **Point the domain.** `reemglascolpc.com` does not currently serve; every canonical and the sitemap already reference it. | **High** | Half day | DNS |
| **Add a grief page** under `/therapy/` | **High** | Half day | — |
| **Build the online-therapy angle** — 680/mo combined, nothing targets it | **High** | Half day | — |
| **Decide the local-entity question**: physical presence (full NAP + GBP) or service-area-only (drop the Cedar Park play) | **High** | Half day | Reem's call |
| **Push on NARM.** Old site hit #22 for a 5,400/mo term with no authority. Directory listings (NARM Training Institute, EMDRIA, Psychology Today) + one good explainer. | **High** | Multi-day | — |
| **Publish 3–4 posts** targeting KD 0–15 questions | Medium | Multi-day | — |
| **Set up Search Console + GBP** on the new domain from day one | **High** | 1 hour | Domain |

---

## Caveats

- `reemglascolpc.com` could not be fetched from this session (the request was refused before any page was retrieved). The DNS check is also unreliable here — the container and the laptop VM both have restricted resolvers, and they returned "no DNS" even for the workers.dev host that demonstrably serves. **Confirm the domain's status directly before acting on it.**
- All volume and difficulty figures are Semrush US database, pulled 2026-10-28. KD 0 means "no measurable difficulty," not "guaranteed ranking."
- `grief counseling austin` is a content *gap*, not a recommendation to offer grief counseling. Only add the page if the practice actually does this work.
- Semrush reported no data for `complex ptsd therapist texas`, `somatic experiencing texas`, `emdr intensive austin`, `therapist leander tx`, `nature therapy austin`, `outdoor therapy austin` and `ecotherapy austin`. No data means Semrush holds none for those terms, not that volume is zero.
