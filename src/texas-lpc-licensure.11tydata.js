/* The guide's Article schema.

   dateModified is the month the rules were last checked against BHEC, not the
   build date and not today. It lives in site.rulesChecked, so the line printed
   on the page and the date in the markup cannot disagree.

   This was briefly done in the jsonld filter for any Article, which stamped the
   same date onto all four blog posts. Dating one page's facts is this page's
   business, so it is done here. */

export default {
  eleventyComputed: {
    schema: (data) => [
      {
        "@type": "Article",
        "@id": "https://reemglascolpc.com/texas-lpc-licensure#article",
        headline: "Texas LPC licensure: hours, supervision rules and timeline",
        description:
          "A practitioner's guide to becoming a Licensed Professional Counselor in Texas, " +
          "covering academic requirements, exams, the 3,000-hour supervised experience " +
          "requirement, the monthly supervision rules under 22 TAC 681.92, continuing " +
          "education, and how to choose an LPC Supervisor.",
        author: { "@id": "https://reemglascolpc.com/#reem" },
        publisher: { "@id": "https://reemglascolpc.com/#practice" },
        dateModified: data.site.rulesCheckedISO,
        about: [
          { "@type": "Thing", name: "Licensed Professional Counselor licensure in Texas" },
          { "@type": "Thing", name: "Clinical supervision of LPC Associates" },
        ],
        isAccessibleForFree: true,
        citation:
          "22 Texas Administrative Code 681.72, 681.82, 681.92, 681.93, 681.140, 681.147",
      },
    ],
  },
};
