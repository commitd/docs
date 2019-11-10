module.exports = {
  siteMetadata: {
    title: "Committed Docs Theme",
    author: "Committed",
    description: "Documentation built with mdx.",
    siteUrl: "https://committed.software/docs",
    docsLocation: "https://github.com/commitd/docs-starter/tree/master/content"
  },
  plugins: [
    {
      resolve: `@commitd/docs-theme`,
      options: {
        contentPath: "docs",
        basePath: "/",
        header: {
          title: "Committed Docs Example",
          logo: { image: "", link: "/" },
          helpUrl: "",
          links: [
            { text: "example", link: "/example1" },
            { text: "mdx", link: "/example2" }
          ]
        },
        sidebar: {
          links: [{ text: "Example", link: "https://committed.io" }],
          ignoreIndex: true
        }
      }
    }
  ]
};
