module.exports = ({
  docsPath = 'docs',
  pathPrefix = '/',
  header = {
    logo: { image: '', link: '/' },
    helpUrl: '',
    links: []
  },
  sidebar = {
    ignoreIndex: true,
    links: []
  }
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
        path: docsPath
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
              // mermaidOptions: {
              //   themeCSS: '.node rect { fill: cornflowerblue; }'
              // }
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
    }
  ]
})
