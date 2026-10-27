// Everything that repeats across the site lives here. Change a contact detail
// once and every page, the footer, the JSON-LD and llms.txt follow.
export default {
  url: "https://findingbalances.com",
  name: "Finding Balance Counseling",
  legalName: "Finding Balance Counseling PLLC",
  clinician: "Reem Glasco, LPC-S",

  // Swap these two once the findingbalances.com mailboxes are live.
  email: "info@findingbalancecounselingpllc.com",
  emailSupervision: "reemglasco@gmail.com",

  city: "Cedar Park",
  region: "TX",
  postal: "78613",
  license: "66562",
  psychologyToday: "https://www.psychologytoday.com/us/therapists?search=reem+glasco",

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

  built: new Date().toISOString().slice(0, 10),
  year: new Date().getFullYear(),

  // Facts quoted in llms.txt. Kept here so the numbers cannot drift from the
  // pages that state them.
  facts: [
    "LPC Supervisor in Texas since 2009; over 15 years of clinical experience.",
    "LPC supervision is $425 a month and includes three individual hours and one group hour, online, statewide in Texas.",
    "Supervision openings: one in fall 2026 and one in spring 2027. Agency contracts of three months are $500 a month.",
    "EMDRIA Approved Consultant. Individual EMDR consultation is $185, online.",
    "Individual therapy is $240 for a 50-minute online session, self-pay. Blue Cross Blue Shield is accepted; other plans are self-pay.",
    "Trail walk and movement therapy is $240 to $370 per session, in person in Texas, adults only.",
    "Modalities: IFS-informed EMDR (the clinical focus), Somatic Experiencing (SEP), NARM, EMDR certified with ASSYST, PRECI and IGTP-OTS, Brainspotting, BASE-P.",
    "Optional equine-assisted supervision and mindfulness retreats near Dripping Springs, Texas; equine supervision sessions are $60 each.",
    "Annual mindful trail retreat for interns, associates and licensed therapists, plus periodic ethics CEUs for Texas LPCs.",
    "The site publishes a free Texas LPC licensure guide: 3,000 supervised hours, 1,500 direct, an 18-month minimum, four supervision hours a month, no more than 50% group, and a 60-month expiry on the LPC Associate licence (22 TAC 681.92).",
  ],

  // 301s from the WordPress site and from the earlier flat structure. Paths that
  // are identical on both sites (/about/, /contact/) need no entry.
  // Rendered to dist/_redirects, which Cloudflare reads natively.
  redirects: [
    ["/supervision/", "/for-therapists/lpc-supervision/"],
    ["/group-therapy/", "/for-therapists/lpc-supervision/"],
    ["/emdr-cit-consultation/", "/for-therapists/emdr-consultation/"],
    ["/my-approach-to-therapy/", "/approach/"],
    ["/narm-neuroaffective-relational-model/", "/approach/"],
    ["/emdr/", "/approach/"],
    ["/somatic-experiencing-se/", "/approach/"],
    ["/services/", "/therapy/"],
    ["/counseling-for-trauma/", "/therapy/trauma/"],
    ["/therapy-for-depression/", "/therapy/depression/"],
    ["/anxiety-therapist-austin-tx/", "/therapy/anxiety/"],
    ["/social-anxiety-disorder-counseling/", "/therapy/anxiety/"],
    ["/walk-therapy/", "/therapy/walk-and-talk/"],
    ["/rates-insurance/", "/fees/"],
    ["/appointment-request/", "/contact/"],
    ["/client-forms/", "/contact/"],
    ["/blog/", "/for-therapists/retreats-training/"],
    ["/books/", "/book/"],
    // The two blog posts that actually ranked on the old site. Both are about
    // Somatic Experiencing, so they land on the approach page's SE section.
    ["/exploring-the-science-behind-somatic-experiencing/", "/approach/"],
    ["/understanding-the-basics-of-somatic-experiencing-therapy/", "/approach/"],
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
    // The book and its companion journal.
    ["/journal/", "/book/"],
    ["/selfcare-journal/", "/book/"],
    // flat paths from the first build of this site
    ["/lpc-supervision", "/for-therapists/lpc-supervision/"],
    ["/emdr-consultation", "/for-therapists/emdr-consultation/"],
    ["/retreats-training", "/for-therapists/retreats-training/"],
    ["/index.html", "/"],
  ],
};
