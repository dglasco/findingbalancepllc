/* The roster page's structured data.

   Front matter is not templated, so an AggregateOffer written there would carry
   two fee numbers typed by hand next to six more in associates.js. Built here
   instead, where the computed ranges are in scope. */

export default {
  eleventyComputed: {
    schema: (data) => [
      {
        "@type": "Service",
        "@id": "https://reemglascolpc.com/therapy/associates#service",
        name: "Therapy with an LPC Associate",
        serviceType: "Psychotherapy with a supervised associate counselor",
        description:
          "Individual, couples and family therapy in Texas with LPC Associates supervised by " +
          "Reem Glasco, LPC-S. Fees from " + data.associateStats.individualLow +
          " per 50-minute session with limited sliding-scale places, online statewide and in " +
          "person in Austin.",
        areaServed: { "@type": "State", name: "Texas" },
        audience: { "@type": "Audience", audienceType: "Adults and couples in Texas" },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: data.associateStats.schemaLow,
          highPrice: data.associateStats.schemaHigh,
          offerCount: String(data.associateStats.count),
          description:
            "Per 50-minute session, varying by associate, with limited sliding-scale places",
        },
      },
    ],
  },
};
