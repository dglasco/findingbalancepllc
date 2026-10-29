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

export default {
  url,
  canonicalUrl: CANONICAL,
  isPreview,
  name: "Finding Balance Counseling",
  legalName: "Finding Balance Counseling PLLC",
  clinician: "Reem Glasco, LPC-S",

  // Swap these two once the reemglascolpc.com mailboxes are live.
  email: "info@findingbalancecounselingpllc.com",
  emailSupervision: "reemglasco@gmail.com",

  // Set this and the number appears on the contact page, in the footer and in
  // the LocalBusiness schema. Empty means the site stays email-only.
  phone: "(737) 378-4167",

  city: "Austin",
  region: "TX",
  postal: "",            // Austin ZIP still to confirm
  license: "66562",
  // Directory profile. Empty by choice: the old listing was removed from the site. Put a URL
  // back here and the About page, the contact block, the footer and the schema sameAs all
  // return on their own.
  psychologyToday: "",

  // Client portal (the practice's EHR). Set this and every portal button on the
  // site goes live; leave it empty and those pages route people to email instead.
  portal: {
    name: "",            // e.g. "SimplePractice"
    url: "",             // the portal URL clients log in to
  },

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

  privacyPolicy: "/assets/forms/privacy-policy.pdf",

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
    "LPC Supervisor in Texas since 2009; over 15 years of clinical experience.",
    "LPC supervision is $425 a month and includes three individual hours and one group hour, four hours in total, online, statewide in Texas.",
    "Supervision openings: one in spring 2027. Agency contracts of three months are $500 a month.",
    "EMDRIA Approved Consultant. Individual EMDR consultation is $185, online.",
    "Individual therapy is $240 for a 50-minute online session, self-pay. Blue Cross Blue Shield is accepted; other plans are self-pay.",
    "Trail walk and movement therapy is $240 to $370 per session, in person in Texas, adults only.",
    "Modalities: IFS-informed EMDR (the clinical focus), Somatic Experiencing (SEP), NARM, EMDR certified with ASSYST, PRECI and IGTP-OTS, Brainspotting, BASE-P.",
    "Optional equine-assisted supervision and mindfulness retreats near Dripping Springs, Texas; equine supervision sessions are $60 each.",
    "Annual mindful trail retreat for interns, associates and licensed therapists, plus periodic ethics CEUs for Texas LPCs.",
    "The site publishes a free Texas LPC licensure guide: 3,000 supervised hours, 1,500 direct, an 18-month minimum, four supervision hours a month, no more than 50% group, and a 60-month expiry on the LPC Associate license (22 TAC 681.92).",
  ],

  // 301s from the WordPress site and from the earlier flat structure. Paths that
  // are identical on both sites (/about/, /contact/) need no entry.
  // Rendered to dist/_redirects, which Cloudflare reads natively.
  redirects: [
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
