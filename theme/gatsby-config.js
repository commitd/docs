var fs = require('fs')

module.exports = ({
  docsPath = 'docs',
  header,
  sidebar,
  print,
  checkLinks = {},
  search = true,
}) => ({
  siteMetadata: {
    title: 'Docs',
    author: 'Committed',
    description: 'Documentation',
    header: Object.assign(
      {
        title: 'Docs',
        logo: { image: '', link: '/' },
        helpUrl: '',
        links: [{ text: '', link: '' }],
      },
      header
    ),
    sidebar: Object.assign(
      {
        ignoreIndex: true,
        links: [{ text: '', link: '' }],
      },
      sidebar
    ),
    print: Object.assign(
      {
        classification: null,
        reference: null,
      },
      print
    ),
    search,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // don't index anything if search is off
        // this retains schema entries but stops the effort.
        fields: search ? [`title`, `description`, `content`] : [],
        resolvers: {
          Docs: {
            title: (node) => node.title,
            description: (node) => node.metaDescription,
            // TODO: This is the full raw body, including front matter
            content: (node) => node.rawBody,
            slug: (node) => node.slug,
          },
        },
        // TODO: Optional filter here, which would be useful for drafts?
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layout/index.tsx`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `docs`,
        path: docsPath,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
        gatsbyRemarkPlugins: [
          {
            resolve: require.resolve(`./plugins/fix-mermaid-pre`),
          },
          {
            resolve: 'gatsby-remark-mermaid',
            options: {
              mermaidOptions: {
                arrowMarkerAbsolute: false,
                fontFamily: "'trebuchet ms', verdana, arial",
              },
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: '',
              className: `autolink`,
            },
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 896,
              disableBgImage: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`],
            },
          },
          {
            resolve: require.resolve(`./plugins/fix-mermaid-post`),
          },
          {
            resolve: require.resolve(`./plugins/check-links`),
            options: checkLinks,
          },
        ],
      },
    },
  ],
})
