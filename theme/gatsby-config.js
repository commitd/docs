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
        classification: '',
        reference: '',
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
        remarkPlugins: [
          require('remark-slug'),
          [
            require('remark-emoji'),
            {
              padSpaceAfter: true,
            },
          ],
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: require.resolve(`./plugins/fix-links`),
          },
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
              linkImagesToOriginal: false,
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
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'pages',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allDocs {
              nodes {
                description
                id
                slug
                title
                rawBody
                excerpt
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'description', 'body'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'slug', 'title', 'description'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allDocs.nodes.map((node) => ({
            id: node.id,
            slug: node.slug,
            title: node.title || '',
            description: node.description || node.excerpt || '',
            body: node.rawBody,
          })),
      },
    },
  ],
})
