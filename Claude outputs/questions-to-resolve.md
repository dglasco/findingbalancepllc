# Questions that need answers before the site is finished

Everything outstanding across the pre-launch list and the two SEO audits, turned into questions someone can actually answer. Grouped by who can answer them. Numbered so replies can just be "1. four, 2. yes, 3. …".

Each question says what it unblocks, so nothing gets answered that does not matter.

---

## Part 1 — For Reem: facts only she knows

### Supervision

**1. Is supervision four individual hours plus one group hour (five a month), or three individual plus one group (four a month)?**
The site currently says both. Eight places say four, three say three — and the three include the supervision page's Google snippet and its structured data. *Unblocks: the only live factual contradiction on the site, and the thing most likely to stop an AI assistant citing the supervision page.*

**2. If the answer is three plus one, does that still meet the four-hour monthly minimum in 22 TAC 681.92?**
Three individual plus one group is four hours total, which meets the minimum exactly with no margin. The current pages argue that four plus one gives a supervisee a buffer if a week is missed. If it's really three plus one, that argument has to come out of two pages. *Unblocks: the fee framing and the compliance-margin section on `/for-therapists/lpc-supervision/` and `/texas-lpc-licensure/`.*

**3. Are the two stated supervision openings — one fall 2026, one spring 2027 — still accurate?**
*Unblocks: the home page, the supervision page and `llms.txt`, all of which state them as fact.*

### Associates

**4. What is the real fee range across the six associates?**
The site says "$100 to $165" in seven places, but the published roster tops out at $150 (Nica $100, Sylvia $125, Natasha $130, Sheila $145, Heather $150). And `/therapy/associates/` says "$100 to $165" in one place and "$100 to $150" in another, 200 lines apart. *Unblocks: seven pages.*

**5. What is Emmy Laursen's session fee, and does she offer sliding scale?**
She is the only associate with "Ask in the consult" in both columns. She may be the source of the $165. *Unblocks: question 4.*

**6. Has each associate approved their own paragraph, fee and contact route?**
The roster was rebuilt from the old site, where several associate pages carried one person's name on another person's URL and three were placeholders. *Unblocks: publishing the associates page at all — this is other people's professional information.*

**7. Are the associates employees of the practice, or independent clinicians under Reem's supervision with their own practices?**
Five list personal or own-practice email addresses; one links to a separate website. *Unblocks: how fees are presented, and whether they belong in the practice's schema.*

**8. Do the associates accept Blue Cross Blue Shield?**
Currently "to be confirmed." *Unblocks: one of the five open insurance rows.*

### Insurance — the five rows that say "to be confirmed"

**9. Is the practice in network or out of network with Blue Cross Blue Shield?**

**10. Which BCBS plans does that cover?**

**11. What does a BCBS client typically pay — copay, coinsurance, or deductible first?**

*Unblocks: all three sit on `/faq/`, visibly marked unanswered, under the question clients ask before any other. They are the last thing standing between that page and finished.*

### Equine and outdoor work

**12. What does a client equine session cost, and how long is it?**
The $60 on the site is the supervision rate for associates, not the client rate. The two must not appear on the same public page without being distinguished. *Unblocks: `/therapy/equine/`.*

**13. Is the Dripping Springs location a facility the practice rents, or somewhere Reem has standing access?**
*Unblocks: whether it can be named as a service location in schema, and whether it belongs in any local SEO work.*

### Retreats, CEUs and training

**14. What is the next retreat date, format and fee?**

**15. What is the next ethics CEU offering — date, fee, and online or trail?**

**16. Is Reem a §681.140(f) approved CE provider, or do the hours count another way?**
An LPC checking whether a CEU counts toward their required approved-provider half cannot tell from the current page. *Unblocks: `/for-therapists/ethics-ceus/`, which is also the only page on the site with zero inbound editorial links.*

**17. Is there a registration route for retreats and CEUs, or should these keep pointing at the contact form?**

### Credentials — needed for accuracy and for directory listings

**18. Is Reem a certified NARM Therapist, or NARM Level 1 / Level 2 trained?**
The site says "NARM therapist" and lists it as a certification in the structured data. The two are different credentials and the distinction matters both for accuracy and for the NARM Training Institute directory. *Unblocks: the schema claim, and a directory listing that is worth more than any page I can write.*

**19. Confirm the EMDR credentials as listed: EMDR certified, EMDRIA Approved Consultant, trained in ASSYST, PRECI, IGTP-OTS, Brainspotting and BASE-P.**
These appear in `llms.txt`, which is the file AI crawlers read as fact. *Unblocks: the practice's entity claims.*

### The book

**20. Is *Effort-less Self-Care* paperback, and how many pages?**
*Unblocks: the `Book` schema, which is currently incomplete.*

---

## Part 2 — For Dave: infrastructure and accounts

**21. When will `reemglascolpc.com` point at the Worker?**
Every canonical on all 29 pages, the sitemap and `robots.txt` already reference it. Until then the site cannot be indexed correctly. *Blocks: everything downstream.*

**22. Can the Cloudflare build command change to `npm run build:preview` now?**
It is currently `npm run build`, so the preview publishes an indexable build that canonicals to the dead domain. One field in Workers Builds settings. Switch it back on launch day.

**23. Does a Google Business Profile exist for Finding Balance Counseling? If not, can one be created?**
Highest-leverage single item in either audit. "therapist cedar park" is 90/mo at difficulty 13 with a $14.69 CPC.

**24. What is the URL of Reem's actual Psychology Today profile?**
The site currently uses `psychologytoday.com/us/therapists?search=reem+glasco` — a search results page — as the `sameAs` in the structured data and as a footer link. A search URL is close to useless for entity reconciliation.

**25. Which directories is the practice already listed in?**
EMDRIA consultant directory, NARM Training Institute, Somatic Experiencing International, TherapyDen, GoodTherapy. EMDRIA's directory already ranks page one for `emdr consultation`, which Reem's own page never will.

**26. Should `site.phone` be set, and to what number?**
Empty today, so the site is email-only and the business schema has no `telephone`. See question 30 before answering.

**27. What is the client portal — which product, and what is the login URL?**
`portal.url` and `portal.name` are empty, so **every portal button on the site is currently inert**: the client portal page, the forms page and the contact page all say "Ask for your portal link" instead of linking anywhere.

**28. Can the five intake PDFs and the privacy policy be pulled off the old WordPress site?**
They are at `/wp-content/uploads/`. Needed: `client-intake.pdf`, `client-information.pdf`, `limits-of-confidentiality.pdf`, `good-faith-estimate.pdf`, `authorization-for-release-of-information.pdf`, `privacy-policy.pdf`. The Good Faith Estimate is a No Surprises Act requirement, not optional. Drop them into `src/assets/forms/` under those exact names and the rows become downloads on the next build.

**29. Is a higher-resolution version of the photo of Reem available?**
Both copies sent so far are 320×400. It works at the size used on the home page but cannot go larger, and the About page still uses a watercolor in place of a portrait.

---

## Part 3 — Decisions, for whoever owns them

**30. Is this an online-only practice, or is there an address clients come to?**
This is the fork that decides the whole local SEO strategy, and it cannot be split both ways:

- *Physical presence* → full name/address/phone in the schema, Google Business Profile, compete for "therapist cedar park" and the local pack.
- *Online-only, with outdoor sessions by arrangement* → drop `MedicalBusiness` for service-area markup, give up "cedar park" entirely, and target `online therapy texas` (590/mo) and `online therapist texas` (90/mo), neither of which any page currently targets.

**31. Which audience should the home page serve?**
Its title, H1 and five of seven H2s target therapists looking for a supervisor. A therapy client gets one aside: "Looking for a therapist rather than a supervisor?" The therapist side is 22% of the site's words. Supervision and therapy are two businesses competing for one H1, and no amount of tag work resolves it. Options: lead with supervision and route clients quickly; lead with therapy; or build a genuine split entry.

**32. Which matters more commercially — more supervisees, or more therapy clients?**
Reem's therapy caseload is described as small and often waitlisted, with two supervision openings a year. If both are near capacity, the honest answer may be that neither needs more traffic and the site's job is credibility rather than acquisition — which would change most of the recommendations in both audits.

**33. Who should "Email Reem" go to on client-facing pages?**
That button appears on 21 pages, including every therapy page, and currently points at `reemglasco@gmail.com` — the supervision address, and a personal Gmail. Should client pages use `info@findingbalancecounselingpllc.com` instead?

**34. Does the practice offer grief counselling?**
`grief counseling austin` is 260/mo at difficulty 16 and the therapy hub covers trauma, anxiety and depression but not grief. Only worth a page if the work is genuinely offered.

**35. Is there real presence in Round Rock, Georgetown or Leander?**
Round Rock is 180/mo combined and Georgetown 140/mo. Location pages are only worth building where there is something true to say — otherwise they are thin doorway pages and a liability.

**36. Should the blog go into the header navigation, and will there be more posts?**
It is currently `inNav: false` — reachable only from the footer and two editorial links — and holds one article.

**37. Can `dist/` be removed from git?**
Cloudflare rebuilds from source on push, so the built output does not need to be tracked. Because the cache-busting hash sits in every page's head, one CSS change currently shows up as a 30-file diff.

---

## What is already settled — no question needed

So nobody spends time on these: the Fees → FAQ merge and its redirects; the 911/988 crisis lines; image spacing and the vertical rhythm; asset cache-busting; the footer menu; the contact block on About; and the photo placement on the Trail Walk and home pages.

---

## The six that block the most

If only a few get answered: **1** (supervision hours), **21** (domain), **22** (build command), **23** (Business Profile), **30** (online-only or not), **31** (home page audience).

One, 21 and 22 are blocking correctness. Twenty-three, 30 and 31 decide what the next quarter of work should even be.
