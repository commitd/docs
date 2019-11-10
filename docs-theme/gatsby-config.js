module.exports = ({
  contentPath = 'docs',
  pathPrefix = '/',
  header = {
    logo: { image: '', link: '/' },
    helpUrl: '',
    links: []
  },
  sidebar = {}
}) => ({
  pathPrefix,
  siteMetadata: {
    header,
    sidebar
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: contentPath
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-mermaid',
            options: {
              mermaidOptions: {
                themeCSS: '.node rect { fill: cornflowerblue; }'
              }
            }
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 896,
              disableBgImage: true
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`]
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `docs-starter`,
        short_name: `docs`,
        start_url: `/`,
        background_color: `#3E3E3E`,
        theme_color: `#FFBB00`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/Avatar 1 - Yellow Trans-512px.png` // This path is relative to the root of the site.
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
})
