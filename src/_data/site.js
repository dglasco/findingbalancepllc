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

  built: new Date().toISOString().slice(0, 10),
  year: new Date().getFullYear(),

  // Facts quoted in llms.txt. Kept here so the numbers cannot drift from the
  // pages that state them.
  facts: [
    "LPC Supervisor in Texas since 2009; over 15 years of clinical experience.",
    "LPC supervision is $425 a month and includes three individual hours and one group hour, online, statewide in Texas.",
    "Supervision openings: one in fall 2026 and one in spring 2027. Agency contracts of three months are $500 a month.",
    "EMDRIA Approved Consultant. Individual EMDR consultation is $185, online.",
    "Individual therapy is $240 for a 50-minute online session, private pay. Not accepting new BCBS clients.",
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
    ["/books/", "/about/"],
    // The two blog posts that actually ranked on the old site. Both are about
    // Somatic Experiencing, so they land on the approach page's SE section.
    ["/exploring-the-science-behind-somatic-experiencing/", "/approach/"],
    ["/understanding-the-basics-of-somatic-experiencing-therapy/", "/approach/"],
    ["/mental-health-links/", "/faq/"],
    ["/telehealth/", "/therapy/"],
    // flat paths from the first build of this site
    ["/lpc-supervision", "/for-therapists/lpc-supervision/"],
    ["/emdr-consultation", "/for-therapists/emdr-consultation/"],
    ["/retreats-training", "/for-therapists/retreats-training/"],
    ["/index.html", "/"],
  ],
};
