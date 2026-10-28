# Questions that need answers before the site is finished

Everything outstanding across the pre-launch list and the two SEO audits, turned into questions someone can actually answer. Grouped by who can answer them. Numbered so replies can just be "1. four, 2. yes, 3. …".

Each question says what it unblocks, so nothing gets answered that does not matter.

**Updated 28 October 2026.** Eight questions have been answered and closed since the first version — they are listed at the bottom under *Answered and done* rather than deleted, so the numbering never shifts and an old reply still matches. **17 remain open.**

---

## Part 1 — For Reem: facts only she knows

### Supervision

**1. Is supervision four individual hours plus one group hour (five a month), or three individual plus one group (four a month)?**
The site currently says both. Eight places say four, three say three — and the three include the supervision page's Google snippet and its structured data. Reem's own Psychology Today listing says **three**, which is evidence but not proof, since that listing was also out of date on several other facts. *Unblocks: the only live factual contradiction on the site, and the thing most likely to stop an AI assistant citing the supervision page.*

**2. If the answer is three plus one, does that still meet the four-hour monthly minimum in 22 TAC 681.92?**
Three individual plus one group is four hours total, which meets the minimum exactly with no margin. The current pages argue that four plus one gives a supervisee a buffer if a week is missed. If it's really three plus one, that argument has to come out of two pages. *Unblocks: the fee framing and the compliance-margin section on `/for-therapists/lpc-supervision/` and `/texas-lpc-licensure/`.*

**3. Are the two stated supervision openings — one fall 2026, one spring 2027 — still accurate?**
*Unblocks: the home page, the supervision page and `llms.txt`, all of which state them as fact.*

### Associates

**4. What is the real fee range across the six associates?**
The site says "$100 to $165" in five places, but the published roster tops out at $150 (Nica $100, Sylvia $125, Natasha $130, Sheila $145, Heather $150). And `/therapy/associates/` says "$100 to $165" in one place and "$100 to $150" in another, 200 lines apart. *Unblocks: five pages.*

**5. What is Emmy Laursen's session fee, and does she offer sliding scale?**
She is the only associate with "Ask in the consult" in both columns. She may be the source of the $165. *Unblocks: question 4.*

**6. Has each associate approved their own paragraph, fee and contact route?**
The roster was rebuilt from the old site, where several associate pages carried one person's name on another person's URL and three were placeholders. *Unblocks: publishing the associates page at all — this is other people's professional information.*

**7. Are the associates employees of the practice, or independent clinicians under Reem's supervision with their own practices?**
Five list personal or own-practice email addresses; one links to a separate website. *Unblocks: how fees are presented, and whether they belong in the practice's schema.*

**8. Do the associates accept Blue Cross Blue Shield?**
Currently "to be confirmed." *Unblocks: one of the five open insurance rows.*

### Insurance — the rows that say "to be confirmed"

**9. Is the practice in network or out of network with Blue Cross Blue Shield?**

**10. Which BCBS plans does that cover?**

**11. What does a BCBS client typically pay — copay, coinsurance, or deductible first?**

*Unblocks: all three sit on `/faq/`, visibly marked unanswered, under the question clients ask before any other. They are the last thing standing between that page and finished.*

### Equine and outdoor work

**12. What does a client equine session cost, and how long is it?**
The $60 on the site is the supervision rate for associates, not the client rate. The two must not appear on the same public page without being distinguished. *Unblocks: `/therapy/equine/`.*

**13. Is the Dripping Springs location a facility the practice rents, or somewhere Reem has standing access?**
Now partly answered — Dripping Springs is confirmed as where the equine work happens, and it is in the schema as a served area. What remains is whether it can be named as a *location* rather than an area. *Unblocks: location markup, and whether it belongs in any local SEO work.*

### Retreats, CEUs and training

**14. What is the next retreat date, format and fee?**

**15. What is the next ethics CEU offering — date, fee, and online or trail?**

**16. Is Reem a §681.140(f) approved CE provider, or do the hours count another way?**
An LPC checking whether a CEU counts toward their required approved-provider half cannot tell from the current page. *Unblocks: `/for-therapists/ethics-ceus/`, which is also the only page on the site with zero inbound editorial links.*

**17. Is there a registration route for retreats and CEUs, or should these keep pointing at the contact form?**

### Credentials

**18. Is Reem a certified NARM Therapist, or NARM Level 1 / Level 2 trained?**
The site says "NARM therapist" and lists it as a certification in the structured data. The two are different credentials and the distinction matters both for accuracy and for the NARM Training Institute directory. *Unblocks: the schema claim, and a directory listing that is worth more than any page I can write.*

**19. Confirm the EMDR credentials as listed: EMDR certified, EMDRIA Approved Consultant, trained in ASSYST, PRECI, IGTP-OTS, Brainspotting and BASE-P.**
These appear in `llms.txt`, which is the file AI crawlers read as fact. *Unblocks: the practice's entity claims.*

**38. What is Reem's Arizona licence number, and is it current?**
Psychology Today shows **LPC-19014**, issued 2020. Her Texas number (66562) is published on the site; the Arizona one is not, because only the state was confirmed, not the number. Arizona is now in the site's served areas and in five rewritten telehealth answers, so the credential should either be stated in full or not claimed at all. *Unblocks: the `Person` credentials block in the schema.*

---

## Part 2 — For Dave: infrastructure and accounts

**21. When will `reemglascolpc.com` point at the Worker?**
Every canonical on all 29 pages, the sitemap and `robots.txt` already reference it. Until then the site cannot be indexed correctly. *Blocks: everything downstream.*

**22. Can the Cloudflare build command change to `npm run build:preview` now?**
It is currently `npm run build`, so the preview publishes an indexable build that canonicals to the dead domain. One field in Workers Builds settings. Switch it back on launch day. *This is now more urgent than it was: a production build strips the build notes, so running the wrong command on the preview host hides the very annotations the preview exists to show.*

**23. Does a Google Business Profile exist for Finding Balance Counseling? If not, can one be created?**
Highest-leverage single item in either audit. Now unblocked by the answer to 30: the practice is a **service-area business** with no address clients visit, so the profile should be created with a service area and no displayed street address. "therapist austin" and the surrounding terms are the target, not "cedar park".

**25. Which directories is the practice already listed in?**
EMDRIA consultant directory, NARM Training Institute, Somatic Experiencing International, TherapyDen, GoodTherapy. Psychology Today is confirmed and now linked from the site. EMDRIA's directory already ranks page one for `emdr consultation`, which Reem's own page never will.

**27. What is the client portal — which product, and what is the login URL?**
`portal.url` and `portal.name` are empty, so **every portal button on the site is currently inert**: the client portal page, the forms page and the contact page all say "Ask for your portal link" instead of linking anywhere.

**28. Can the five intake PDFs and the privacy policy be pulled off the old WordPress site?**
They are at `/wp-content/uploads/`. Needed: `client-intake.pdf`, `client-information.pdf`, `limits-of-confidentiality.pdf`, `good-faith-estimate.pdf`, `authorization-for-release-of-information.pdf`, `privacy-policy.pdf`. The Good Faith Estimate is a No Surprises Act requirement, not optional. Drop them into `src/assets/forms/` under those exact names and the rows become downloads on the next build.

**29. Is a higher-resolution version of the photo of Reem available?**
Both copies sent so far are 320×400. It works at the size used on the home page but cannot go larger, and the About page still uses a watercolor in place of a portrait.

**39. What is the practice's Austin postcode?**
The city moved from Cedar Park to Austin, and 78613 was Cedar Park's, so it could not follow. `site.postal` is empty, and the schema and all three templates now omit `postalCode` cleanly rather than printing a stray number. For a service-area business with no public address this is optional — but if a Google Business Profile is created it will want one.

---

## Part 3 — Decisions, for whoever owns them

**31. Which audience should the home page serve?**
Its title, H1 and five of seven H2s target therapists looking for a supervisor. A therapy client gets one aside: "Looking for a therapist rather than a supervisor?" The therapist side is 22% of the site's words. Supervision and therapy are two businesses competing for one H1, and no amount of tag work resolves it. Options: lead with supervision and route clients quickly; lead with therapy; or build a genuine split entry.

**32. Which matters more commercially — more supervisees, or more therapy clients?**
Reem's therapy caseload is described as small and often waitlisted, with two supervision openings a year. If both are near capacity, the honest answer may be that neither needs more traffic and the site's job is credibility rather than acquisition — which would change most of the recommendations in both audits.

**33. Who should "Email Reem" go to on client-facing pages?**
That button appears on 21 pages, including every therapy page, and currently points at `reemglasco@gmail.com` — the supervision address, and a personal Gmail. Should client pages use `info@findingbalancecounselingpllc.com` instead? *Now that a practice phone number is published, the same question applies to it: one number for everything, or a different route for clients?*

**35. Is there real presence in Round Rock, Georgetown or Leander?**
Round Rock is 180/mo combined and Georgetown 140/mo. Location pages are only worth building where there is something true to say — otherwise they are thin doorway pages and a liability. *The answer to 30 makes this less likely to be worth it: a service-area practice with no premises has little to say about a specific suburb.*

**36. Should the blog go into the header navigation, and will there be more posts?**
It is currently `inNav: false` — reachable only from the footer and two editorial links — and holds one article. Recommendation: leave it out of the navigation until there are three or four posts, then promote it and rebuild the index as a proper post list.

**37. Can `dist/` be removed from git?**
Cloudflare rebuilds from source on push, so the built output does not need to be tracked. Because the cache-busting hash sits in every page's head, one CSS change currently shows up as a 30-file diff.

**40. Should Arizona be marketed, or only acknowledged?**
Arizona is now in the schema's served areas and in the five telehealth answers that previously said Texas only. Nothing else promotes it: roughly fifty "online across Texas" lines are untouched, because Texas is plainly the primary market and rewriting them all would overstate a second state nobody asked to target. If Arizona is worth pursuing it needs its own page and its own keyword research, neither of which exists.

---

## Answered and done

Closed since the first version of this list. Kept here so the numbering holds and so nobody re-asks.

| # | Question | Answer | What changed |
|---|---|---|---|
| 20 | Book format and page count | Paperback, 50 pages | Plus ISBN 979-8-279-65687-5, Barnes & Noble Press, published 12 Feb 2026 — all now in the `Book` schema and in a visible "The details" block |
| 24 | Real Psychology Today profile URL | Supplied | `sameAs` fixed; two further hardcoded search URLs found and fixed on About and Contact |
| 26 | Publish a phone number? | (737) 378-4167 | Live in the footer, on Contact, and as `telephone` in the business schema |
| 30 | Online-only, or an address clients visit? | **No office clients visit** — every in-person session is outdoors, on a trail or with the horses | Service-area business. City corrected to Austin across 9 places; FAQ location answer rewritten; Cedar Park removed from served areas |
| 34 | Does the practice offer grief counselling? | Yes — listed as an expertise on Psychology Today | A grief page is justified: `grief counseling austin`, 260/mo at difficulty 16 |
| — | Which city is the practice in? | **Austin**, with equine work in Dripping Springs | Nine occurrences updated, including two page titles and `geo.placename` |
| — | Licensed in which states? | **Texas and Arizona** | Five "must be in Texas" statements corrected; Arizona added to served areas. Licence number still open — see 38 |
| — | Client age range | Adults 18+, in person outdoors only | Already correct site-wide; verified rather than changed |

---

## Also fixed without needing an answer

Found and resolved while working through the above, so they are not questions:

- **The twelve "Note for the site build" blocks no longer reach visitors.** A production build strips them; a preview build keeps them. They were rendering publicly on eleven pages, including one on About telling the reader the portrait was a placeholder.
- **The crisis note is no longer styled like a draft.** It shared the dashed `.note` box with the temporary build annotations; it now has its own solid treatment with 911 and 988 emphasised. Contrast 11.8:1.
- **The seven step dots on `/book/practice/` were 9×9 px targets.** Now 24×24 with no overlap between neighbours, WCAG 2.2 SC 2.5.8, with the visible dot unchanged.
- **`priceRange` in the business schema said `$185 - $425`.** The practice actually spans $70 (associate sliding scale) to $500 (agency supervision contract). The old range told Google nothing was available under $185.

---

## The five that block the most

If only a few get answered: **1** (supervision hours), **21** (domain), **22** (build command), **23** (Business Profile), **31** (home page audience).

One, 21 and 22 are blocking correctness. Twenty-three and 31 decide what the next quarter of work should be. Question 30 used to be on this list and is now answered, which is what unblocked 23.
