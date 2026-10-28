import fs from "node:fs";
import crypto from "node:crypto";

// Kept in step with src/_data/site.js. The FAQ transform runs outside template
// data, so it needs its own copy of the host.
const CANONICAL = "https://reemglascolpc.com";
const SITE = (process.env.SITE_URL || CANONICAL).replace(/\/$/, "");

// ---------------------------------------------------------------------------
// URL helpers. Page URLs are directory-style with a trailing slash, which is
// what Cloudflare's auto-trailing-slash handling serves for folder index
// files, so canonicals, the sitemap and _redirects all agree.
// ---------------------------------------------------------------------------

const depth = (url) => url.split("/").filter(Boolean).length;
const parentUrl = (url) => {
  const parts = url.split("/").filter(Boolean);
  parts.pop();
  return parts.length ? `/${parts.join("/")}/` : "/";
};

const byOrder = (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99);

// ---------------------------------------------------------------------------
// Structured data. Built in JS rather than assembled in a template, because a
// JSON graph written in Nunjucks is unreadable and easy to break.
// ---------------------------------------------------------------------------

function practiceGraph(site) {
  return [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      inLanguage: "en-US",
      publisher: { "@id": `${site.url}/#practice` },
    },
    {
      "@type": ["MedicalBusiness", "ProfessionalService"],
      "@id": `${site.url}/#practice`,
      name: site.name,
      alternateName: site.legalName,
      url: `${site.url}/`,
      email: site.email,
      priceRange: "$185 - $425",
      medicalSpecialty: "Psychiatric",
      founder: { "@id": `${site.url}/#reem` },
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressRegion: site.region,
        postalCode: site.postal,
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "State", name: "Texas" },
        { "@type": "City", name: "Austin" },
        { "@type": "City", name: "Cedar Park" },
      ],
      availableLanguage: "English",
      knowsAbout: [
        "LPC supervision",
        "IFS-informed EMDR",
        "NeuroAffective Relational Model",
        "Somatic Experiencing",
        "developmental trauma",
        "C-PTSD",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "LPC supervision for Texas LPC Associates" },
            price: "425",
            priceCurrency: "USD",
            eligibleDuration: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "EMDRIA-approved EMDR consultation" },
            price: "185",
            priceCurrency: "USD",
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Individual therapy, 50 minutes, online" },
            price: "240",
            priceCurrency: "USD",
          },
        ],
      },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#reem`,
      name: "Reem Glasco",
      honorificSuffix: "LPC-S",
      jobTitle: "Licensed Professional Counselor Supervisor",
      worksFor: { "@id": `${site.url}/#practice` },
      email: site.email,
      knowsLanguage: "English",
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: `Texas Licensed Professional Counselor Supervisor (LPC-S), license ${site.license}`,
          recognizedBy: {
            "@type": "Organization",
            name: "Texas Behavioral Health Executive Council",
          },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: "EMDRIA Approved Consultant",
          recognizedBy: { "@type": "Organization", name: "EMDR International Association" },
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: "Somatic Experiencing Practitioner (SEP)",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "certification",
          name: "NARM Therapist",
        },
      ],
      sameAs: [site.psychologyToday],
    },
  ];
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addWatchTarget("src/assets/");

  // Every page, in nav order.
  eleventyConfig.addCollection("pages", (api) =>
    api.getFilteredByTag("pages").sort(byOrder)
  );

  // Top-level entries only; hubs carry their own children, as on tomsscuba.com.
  eleventyConfig.addFilter("navItems", (pages) =>
    pages.filter((p) => depth(p.url) <= 1 && p.data.inNav !== false && !p.data.hidden)
  );

  eleventyConfig.addFilter("childrenOf", (pages, url) =>
    pages.filter((p) => parentUrl(p.url) === url && p.url !== url).sort(byOrder)
  );

  // Home, then each hub above this page, then the page itself.
  eleventyConfig.addFilter("breadcrumb", (pages, url) => {
    const trail = [];
    let current = url;
    while (current !== "/") {
      const match = pages.find((p) => p.url === current);
      if (match) trail.unshift({ url: match.url, nav: match.data.nav });
      current = parentUrl(current);
    }
    return trail;
  });

  eleventyConfig.addFilter("depth", depth);

  eleventyConfig.addFilter("jsonld", ({ site, url, title, description, crumbs, kids, extra }) => {
    const absolute = site.url + url;
    const graph = [
      ...practiceGraph(site),
      {
        "@type": "WebPage",
        "@id": `${absolute}#webpage`,
        url: absolute,
        name: title,
        description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#practice` },
        inLanguage: "en-US",
      },
    ];

    if (crumbs && crumbs.length) {
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${absolute}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
          ...crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: c.nav,
            item: site.url + c.url,
          })),
        ],
      });
    }

    if (kids && kids.length) {
      graph.push({
        "@type": "ItemList",
        "@id": `${absolute}#children`,
        name: title,
        itemListElement: kids.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.data.nav,
          url: site.url + c.url,
        })),
      });
    }

    // Page front matter hardcodes the canonical host in its @id values. Rewrite
    // them to whatever host this build is for, so a preview deploy does not
    // claim the real site's entity ids.
    const extras = JSON.parse(
      JSON.stringify([].concat(extra || [])).split(CANONICAL).join(site.url)
    );
    for (const entry of extras) {
      graph.push({ provider: { "@id": `${site.url}/#practice` }, ...entry });
    }

    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  });

  // True when the asset exists in src/. The client-forms page uses it so a PDF
  // that has not been copied over from the old WordPress site yet degrades to a
  // "request it by email" line rather than shipping a 404.
  eleventyConfig.addFilter("assetExists", (url) =>
    fs.existsSync("src" + url)
  );

  // Short content hash for an asset URL, appended as ?v= on the stylesheet and
  // scripts. _headers pins /assets/* for a year as immutable, which is correct
  // only while the URL changes when the bytes do: without this, a returning
  // visitor keeps last year's CSS and never revalidates. Images are not hashed,
  // so replacing one in place needs a new filename.
  const hashCache = new Map();
  eleventyConfig.addFilter("assetHash", (url) => {
    if (!url) return "";
    if (hashCache.has(url)) return hashCache.get(url);
    let h = "";
    try {
      h = crypto.createHash("sha256")
        .update(fs.readFileSync("src" + url))
        .digest("hex")
        .slice(0, 8);
    } catch {
      h = ""; // asset not in src/; ship the bare URL rather than a broken one
    }
    hashCache.set(url, h);
    return h;
  });

  // Used by the single-file preview to inline the stylesheet and script.
  eleventyConfig.addFilter("readFile", (path) => fs.readFileSync(path, "utf8"));

  // The preview file is reviewed as a standalone file on a phone, where a path
  // like /assets/img/x.jpg resolves to nothing, so images are inlined there.
  eleventyConfig.addFilter("inlineImages", (html) =>
    String(html).replace(/src="(\/assets\/img\/[^"]+)"/g, (match, url) => {
      const file = "src" + url;
      if (!fs.existsSync(file)) return match;
      const type = file.endsWith(".png") ? "image/png" : "image/jpeg";
      return `src="data:${type};base64,${fs.readFileSync(file).toString("base64")}"`;
    })
  );

  // Turns page links into click handlers for the preview file, where any href
  // would navigate out of an in-app viewer.
  eleventyConfig.addFilter("previewLinks", (html) =>
    String(html)
      .replace(/href="\/"/g, 'data-page="home" role="link" tabindex="0"')
      .replace(
        /href="\/([a-z0-9\-/]+)\/"/g,
        (_m, slug) => `data-page="${slug.replace(/\//g, "--")}" role="link" tabindex="0"`
      )
  );

  eleventyConfig.addFilter("pageId", (url) =>
    url === "/" ? "home" : url.replace(/^\/|\/$/g, "").replace(/\//g, "--")
  );

  // FAQPage schema is derived from the accordions actually rendered on the
  // page, so the markup can never claim a question the reader cannot see.
  eleventyConfig.addTransform("faqSchema", function (content) {
    if (!(this.page.outputPath || "").endsWith(".html")) return content;
    if (!content.includes("<!--FAQ_SCHEMA-->")) return content;

    const strip = (html) =>
      html
        // .vh carries text meant only for a screen reader, such as "opens in a
        // new tab". It is part of the link, not part of the answer, and it
        // reads as noise once an assistant quotes the answer back.
        .replace(/<span class="vh">[\s\S]*?<\/span>/g, "")
        .replace(/<\/p>\s*<p>/g, " ")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();

    const pattern =
      /<details>\s*<summary>([\s\S]*?)<\/summary>\s*<div class="answer-body">([\s\S]*?)<\/div>\s*<\/details>/g;
    const questions = [...content.matchAll(pattern)].map(([, q, a]) => ({
      "@type": "Question",
      name: strip(q),
      acceptedAnswer: { "@type": "Answer", text: strip(a) },
    }));

    if (!questions.length) return content.replace("<!--FAQ_SCHEMA-->", "");

    const absolute = SITE + this.page.url;
    const block = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${absolute}#faq`,
      isPartOf: { "@id": `${absolute}#webpage` },
      mainEntity: questions,
    })}</script>`;
    return content.replace("<!--FAQ_SCHEMA-->", block);
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
