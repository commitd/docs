require("dotenv").config()
const config = require("./config")

const plugins = [
  `gatsby-plugin-typescript`,
  `gatsby-plugin-material-ui`,
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `docs`,
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
      remarkPlugins: [require("remark-slug"), require("remark-emoji")],
      gatsbyRemarkPlugins: [ {
        resolve: 'gatsby-remark-mermaid',
        options: {
            mermaidOptions: {
                themeCSS: ".node rect { fill: cornflowerblue; }"
            }
        }
     }, `gatsby-remark-prismjs`],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,

  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `docs-starter`,
      short_name: `docs`,
      start_url: `/`,
      background_color: `#3E3E3E`,
      theme_color: `#FFBB00`,
      display: `minimal-ui`,
      icon: `src/images/Avatar 1 - Yellow Trans-512px.png`, // This path is relative to the root of the site.
    },
  },
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  // `gatsby-plugin-offline`,
]

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    author: config.siteMetadata.author,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : "/",
      image: config.header.logo,
    },
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins: plugins,
}
