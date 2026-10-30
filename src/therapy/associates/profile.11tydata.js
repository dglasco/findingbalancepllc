/* The Person schema for each associate.

   This lives here rather than in the template's front matter because YAML
   template strings inside a nested object are resolved once, not once per
   paginated page: every profile ended up carrying the first associate's name
   and @id. A computed function gets the page's own `who` and cannot drift. */

export default {
  eleventyComputed: {
    schema: (data) => {
      const w = data.who;
      if (!w) return [];
      const base = "https://reemglascolpc.com";
      return [{
        "@type": "Person",
        "@id": `${base}/therapy/associates/${w.slug}#person`,
        name: w.name,
        honorificSuffix: w.credential,
        jobTitle: "Licensed Professional Counselor Associate",
        worksFor: { "@id": `${base}/#practice` },
        ...(w.email ? { email: w.email } : {}),
        ...(w.phone ? { telephone: w.phone } : {}),
        knowsAbout: w.focus,
      }];
    },
  },
};
