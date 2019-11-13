module.exports = ({
  docsPath = 'docs',
  pathPrefix = '/',
  header,
  sidebar
}) => ({
  pathPrefix,
  siteMetadata: {
    title: 'Docs',
    author: 'Committed',
    description: 'Documentation',
    header: Object.assign(
      {
        title: 'Docs',
        logo: { image: '', link: '/' },
        helpUrl: '',
        links: [{ text: '', link: '' }]
      },
      header
    ),
    sidebar: Object.assign(
      {
        ignoreIndex: true,
        links: [{ text: '', link: '' }]
      },
      sidebar
    )
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
              // TODO: custom theme
              // mermaidOptions: {
              //   themeCSS: '.node rect { fill: cornflowerblue; }'
              // }
            }
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: '',
              className: `autolink`
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
