const { NODE_ENV } = process.env;

const pathPrefix = env => {
  return env === "production" ? "/docs" : "";
};

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
      resolve: `@commitd/gatsby-theme-docs`,
      options: {
        contentPath: "docs",
        pathPrefix: pathPrefix(NODE_ENV),
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
          links: [{ text: "Example", link: "https://committed.io" }]
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `@commitd/docs-theme`,
        short_name: `docs`,
        start_url: `/`,
        background_color: `#3E3E3E`,
        theme_color: `#FFBB00`,
        display: `browser`,
        icon: `${__dirname}/Avatar.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
