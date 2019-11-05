const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://committed.software/docs",
    gaTrackingId: null,
  },
  header: {
    logo: "/icons/icon-48x48.png",
    logoLink: "https://committed.io",
    title: "Committed Docs Starter",
    githubUrl: "https://github.com/committed/docs-starter",
    helpUrl: "",
    tweetText: "",
    links: [{ text: "", link: "" }],
  },
  sidebar: {
    forcedNavOrder: ["/introduction", "/test"],
    links: [{ text: "Hasura", link: "https://committed.io" }],
    frontline: false,
    ignoreIndex: true,
  },
  siteMetadata: {
    title: "Committed Docs",
    author: "Committed",
    description: "Documentation built with mdx.",
    ogImage: null,
    docsLocation: "https://github.com/commitd/docs-starter/tree/master/content",
    favicon: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
  },
}

module.exports = config
