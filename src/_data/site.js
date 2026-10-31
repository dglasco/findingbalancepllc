// Everything that repeats across the site lives here. Change a contact detail
// once and every page, the footer, the JSON-LD and llms.txt follow.

// The live domain. Canonicals, the sitemap, robots.txt and every JSON-LD @id
// are built from whatever `url` ends up being, so a preview deploy must not
// claim this one.
const CANONICAL = "https://reemglascolpc.com";

// SITE_URL overrides it, which is how the workers.dev preview is built. Any
// host that is not CANONICAL is treated as a preview: those builds go out
// noindex and with a robots.txt that disallows everything, so the preview can
// never compete with the real site or get indexed under a throwaway hostname.
const url = (process.env.SITE_URL || CANONICAL).replace(/\/$/, "");
const isPreview = url !== CANONICAL;

// The month the Texas rules on /texas-lpc-licensure/ were last checked against
// BHEC. Update it when you re-verify them, and nothing else: the guide prints
// it, the Article schema's dateModified is built from it, and the build warns
// once it is stale. Deliberately not the build date, because a rebuild does not
// re-read the rules and a stamp that moved on its own would claim a check
// nobody made. Six months is long enough for a rule change to land and short
// enough that the guide never quietly claims currency it does not have.
const RULES_CHECKED = "2026-09";
const RULES_STALE_MONTHS = 6;

const monthsSinceChecked =
  (new Date().getFullYear() - +RULES_CHECKED.slice(0, 4)) * 12 +
  (new Date().getMonth() + 1 - +RULES_CHECKED.slice(5, 7));
if (monthsSinceChecked >= RULES_STALE_MONTHS) {
  console.warn(
    `\n  WARNING  The Texas rules on /texas-lpc-licensure/ were last checked ` +
    `${monthsSinceChecked} months ago (${RULES_CHECKED}).\n` +
    `           Re-verify against bhec.texas.gov, then update RULES_CHECKED in src/_data/site.js.\n`
  );
}

export default {
  url,
  canonicalUrl: CANONICAL,
  isPreview,
  name: "Finding Balance Counseling",
  legalName: "Finding Balance Counseling PLLC",
  clinician: "Reem Glasco, LPC-S",

  // One address for the whole site. It was two, and the second was a personal
  // Gmail reached from the shared call-to-action band on 28 pages, so a client
  // reading the trauma page and clicking "Email Reem" wrote to the supervision
  // inbox. If a separate supervision mailbox is wanted later, add it back here
  // and change only the templates that should use it, never the shared band.
  // Swap this once the reemglascolpc.com mailboxes are live.
  email: "info@findingbalancecounselingpllc.com",

  // Set this and the number appears on the contact page, in the footer and in
  // the LocalBusiness schema. Empty means the site stays email-only.
  phone: "512-965-5105",

  rulesChecked: RULES_CHECKED,

  // The year of Reem's Coherence therapy training, shown on /about/. It read
  // "Coming in 2026" until that stopped being the future.
  coherenceYear: 2026,

  // The privacy policy's "last updated" line. Same reason as the rules date
  // above: a hand-typed date in a legal notice rots quietly, and a date that
  // moved with the build would claim a review nobody did.
  privacyUpdated: "2026-10-29",
  get privacyUpdatedLabel() {
    const [y, m, d] = this.privacyUpdated.split("-");
    return new Date(Date.UTC(+y, +m - 1, +d))
      .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  },
  get rulesCheckedLabel() {
    const [y, m] = this.rulesChecked.split("-");
    return new Date(Date.UTC(+y, +m - 1, 1))
      .toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  },
  get rulesCheckedISO() {
    return `${this.rulesChecked}-01`;
  },

  city: "Austin",
  region: "TX",
  postal: "78726",       // Shown on About and in the footer, and emitted as postalCode
  license: "66562",
  // Two dates, not one. LPC in 2010, supervisor status in 2016 — which is
  // consistent with the five-year unrestricted-licence rule the licensure
  // guide explains. Pages quote whichever one they mean.
  licensedSince: 2010,
  supervisorSince: 2016,
  get supervisorYears() {
    return new Date().getFullYear() - this.supervisorSince;
  },
  get licensedYears() {
    return new Date().getFullYear() - this.licensedSince;
  },
  // Professional directory profiles. Each entry becomes a sameAs on the practitioner in the
  // structured data, which is what lets search engines and answer engines tie "Reem Glasco"
  // here to the same person elsewhere. Each also renders as a Directory row on About and
  // Contact and a link in the footer. Empty renders nothing and emits no sameAs.
  profiles: [
    { name: "EMDRIA", url: "https://www.emdria.org/directory/people/reem-glasco/" },
    { name: "NARM Training Institute",
      url: "https://directory.narmtraining.com/united-states/narm-therapist/finding-balance-counseling-pllc" },
  ],

  // Intake paperwork. Drop the PDFs into src/assets/forms/ under these names and
  // they appear as download links; until then each row renders as available on
  // request. Order is the order clients should work through them.
  forms: [
    { name: "Client Intake", file: "/assets/forms/client-intake.pdf",
      note: "History, what brings you, and what you want from the work." },
    { name: "Client Information", file: "/assets/forms/client-information.pdf",
      note: "Contact details, emergency contact, and payment information." },
    { name: "Limits of Confidentiality", file: "/assets/forms/limits-of-confidentiality.pdf",
      note: "What stays in the room and the narrow situations where it cannot. Required." },
    { name: "Good Faith Estimate", file: "/assets/forms/good-faith-estimate.pdf",
      note: "Your written cost estimate under the No Surprises Act. Required for self-pay clients." },
    { name: "Authorization for Release of Information", file: "/assets/forms/authorization-for-release-of-information.pdf",
      note: "Only if you want records shared with a doctor, school or another clinician." },
  ],


  // The seven steps of Effort-less Self-Care. One source for both /book/, which
  // shows them as cards, and /book/practice/, which walks through them. "short"
  // is the book-page summary; "instruction" is what the practice page reads out.
  steps: [
    { n: 1, key: "space", title: "Find Your Comfortable Space",
      quote: "Comfort is where healing begins.",
      img: "/assets/img/step-1-space.jpg", w: 553, h: 760,
      alt: "Watercolor of an armchair beside a sunlit window with a small potted plant.",
      short: "Pause and find a place, indoors or outdoors, that invites calm. Notice how it feels in your body.",
      instruction: "Take a moment to pause and find a place, indoors or outdoors, that inspires a sense of calm and comfort. You may even hold a small piece of nature: a stone, a leaf, a shell. Notice how you feel, but there is no need to change anything.",
      prompts: ["What do I notice about this place?", "How does it feel in my body?", "What made me choose it?"] },

    { n: 2, key: "light", title: "Face the Light",
      quote: "Let the sun guide you.",
      img: "/assets/img/step-2-light.jpg", w: 760, h: 760,
      alt: "Watercolor of a person sitting cross-legged in front of a bright window.",
      short: "Face the morning sun, east, a symbol of new beginnings. Picture the light warming your face.",
      instruction: "When sitting, face the morning sun, east. This is not just a direction; it stands for new beginnings. Picture the light warming your face, and feel what arises.",
      prompts: ["What feelings emerge in my body?", "What thoughts or feelings arise?"] },

    { n: 3, key: "heart", title: "Return to Your Heart",
      quote: "Come home to your breath.",
      img: "/assets/img/step-3-heart.jpg", w: 506, h: 760,
      alt: "Watercolor of a person resting one hand on their chest with eyes closed.",
      short: "Place your hand on your chest and feel your breath. Do not change it, just notice it.",
      instruction: "Place your hand on your chest and feel your breath. Do not change it, just notice it. Sit like this for about thirty seconds.",
      timer: 30,
      prompts: ["What happens when I place my hand on my heart?", "What emotions come up?"] },

    { n: 4, key: "breathe", title: "Breathe in Peace, Breathe out Stress",
      quote: "Breathe in fresh air; breathe out stress.",
      img: "/assets/img/step-4-breathe.jpg", w: 506, h: 760,
      alt: "Watercolor of a person in a blue shirt with a hand on their chest, eyes closed.",
      short: "Inhale: I am breathing in fresh air. Exhale: I am breathing out stress. Repeat softly three times.",
      instruction: "With your hand resting on your chest, notice your breath. Say softly on the inhale, \u201cI know I am breathing in fresh air,\u201d and on the exhale, \u201cI know I am breathing out stress.\u201d Repeat three times.",
      breathing: true,
      prompts: ["Can I count the rise and fall of my breath?", "What emotions appear as I repeat?"] },

    { n: 5, key: "feel", title: "Pause and Feel",
      quote: "Your body speaks. Listen.",
      img: "/assets/img/step-5-feel.jpg", w: 506, h: 760,
      alt: "Watercolor silhouette of a seated figure against the sea, with points of warm light.",
      short: "Scan from head to toe. Observe where you feel tension, pressure or pain, and what your body is telling you.",
      instruction: "Scan your body from head to toe. Observe where you feel tension, pressure or pain. Notice how you feel, but there is no need to change anything.",
      prompts: ["What areas feel tight, heavy, or off?", "What is my body telling me?"] },

    { n: 6, key: "name", title: "Gently Name What You Feel",
      quote: "Name it to know it.",
      img: "/assets/img/step-6-name.jpg", w: 760, h: 752,
      alt: "Watercolor of a person beside four simple faces showing sadness, anger, calm and happiness.",
      short: "Label the emotion without judgment. Ask what it is trying to tell you, and what sits underneath the story.",
      instruction: "Identify your feelings, thoughts or sensations. Label the emotion without judgment. Ask: what is this emotion trying to tell me? Without the story, what is underneath?",
      emotions: true,
      prompts: ["What emotions show up?", "What are they saying?", "Is it guiding me back to breath?"] },

    { n: 7, key: "ground", title: "Ground Yourself Through Your Senses",
      quote: "Your senses ground you in the now.",
      img: "/assets/img/step-7-ground.jpg", w: 760, h: 760,
      alt: "Watercolor of a person sitting outdoors in sunlight among trees.",
      short: "Notice what you see, hear, smell, taste and touch. Sit with any positive shift for at least seventeen seconds.",
      instruction: "Remain in your spot, hand on your chest, facing east. Notice: what do you see? Hear? Smell? Taste? Touch? Sit with any positive shifts you feel for at least seventeen seconds.",
      timer: 17,
      prompts: ["What do I see, hear, smell, taste and touch?", "What positive feelings show up?", "How does my body respond?"] },
  ],


  built: new Date().toISOString().slice(0, 10),
  year: new Date().getFullYear(),

  // Facts quoted in llms.txt. Kept here so the numbers cannot drift from the
  // pages that state them.
  facts: [
    "Licensed Professional Counselor in Texas since 2010; LPC Supervisor since 2016.",
    "LPC supervision is $425 a month and includes three individual hours and one group hour, four hours in total, online, statewide in Texas.",
    "Supervision places are capped and availability changes; ask in the consult. Agency contracts of three months are $500 a month.",
    "EMDRIA Approved Consultant. Individual EMDR consultation is $185, online.",
    "Individual therapy is $240 for a 50-minute online session, self-pay. Blue Cross Blue Shield is accepted; other plans are self-pay.",
    "Trail walk and movement therapy is $125 for a one-hour session, in person in Texas, adults only.",
    "Modalities: IFS-informed EMDR (the clinical focus), Somatic Experiencing (SEP), NARM, EMDR certified with ASSYST, PRECI and IGTP-OTS, Brainspotting, BASE-P.",
    "Optional equine-assisted supervision and mindfulness retreats near Dripping Springs, Texas; equine supervision sessions are $60 each.",
    "Annual mindful trail retreat for interns, associates and licensed therapists, plus periodic ethics CEUs for Texas LPCs.",
    "The site publishes a free Texas LPC licensure guide: 3,000 supervised hours, 1,500 direct, an 18-month minimum, four supervision hours a month, no more than 50% group, and a 60-month expiry on the LPC Associate license (22 TAC 681.92).",
  ],

  // 301s from the WordPress site and from the earlier flat structure. Paths that
  // are identical on both sites (/about/, /contact/) need no entry.
  // Rendered to dist/_redirects, which Cloudflare reads natively.
  redirects: [
    ["/contact/client-portal/", "/contact/"],
    ["/wp-content/uploads/2020/02/privacy-policy.pdf", "/privacy/"],
    ["/supervision/", "/for-therapists/lpc-supervision/"],
    ["/group-therapy/", "/for-therapists/lpc-supervision/"],
    ["/emdr-cit-consultation/", "/for-therapists/emdr-consultation/"],
    ["/my-approach-to-therapy/", "/approach/"],
    ["/narm-neuroaffective-relational-model/", "/approach/narm/"],
    ["/emdr/", "/approach/emdr/"],
    ["/somatic-experiencing-se/", "/approach/somatic-experiencing/"],
    ["/services/", "/therapy/"],
    ["/counseling-for-trauma/", "/therapy/trauma/"],
    ["/therapy-for-depression/", "/therapy/depression/"],
    ["/anxiety-therapist-austin-tx/", "/therapy/anxiety/"],
    ["/social-anxiety-disorder-counseling/", "/therapy/anxiety/"],
    ["/walk-therapy/", "/therapy/walk-and-talk/"],
    ["/rates-insurance/", "/faq/"],
    ["/fees/", "/faq/"],
    ["/appointment-request/", "/contact/"],
    ["/client-forms/", "/contact/"],
    ["/how-to-set-healthy-boundaries/", "/blog/healthy-boundaries/"],
    ["/books/", "/book/"],
    // The two blog posts that actually ranked on the old site. Both are about
    // Somatic Experiencing, so they land on the approach page's SE section.
    ["/exploring-the-science-behind-somatic-experiencing/", "/approach/somatic-experiencing/"],
    ["/understanding-the-basics-of-somatic-experiencing-therapy/", "/approach/somatic-experiencing/"],
    ["/mental-health-links/", "/faq/"],
    ["/telehealth/", "/therapy/"],
    // Staff pages. Several carry one person's name on another person's slug,
    // so they all land on the roster rather than being mapped name to name.
    ["/staff-2-2/", "/therapy/associates/"],
    ["/heather-hanlin/", "/therapy/associates/"],
    ["/nica-ayala-m-a-lpc-associate/", "/therapy/associates/"],
    ["/natasha-mahesh-lpc-associate/", "/therapy/associates/"],
    ["/genesis-bravo-lpc-associate/", "/therapy/associates/"],
    ["/lpc-associate-1/", "/therapy/associates/"],
    ["/lpc-associate-3/", "/therapy/associates/"],
    ["/dawn-warren/", "/therapy/associates/"],
    ["/coming-soon/", "/therapy/associates/"],
    // The book. The old site split it across a books page and two journal posts.
    ["/journal/", "/book/"],
    ["/selfcare-journal/", "/book/"],
    // flat paths from the first build of this site
    ["/lpc-supervision", "/for-therapists/lpc-supervision/"],
    ["/emdr-consultation", "/for-therapists/emdr-consultation/"],
    ["/retreats-training", "/for-therapists/retreats-training/"],
    ["/index.html", "/"],
  ],
};
