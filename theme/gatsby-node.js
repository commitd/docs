const path = require('path')
const startCase = require('lodash.startcase')
const { calculateTreeData, flattenTree, makeSlug } = require('./src/util/node')

const fs = require('fs')
// Make sure the docs directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const docsPath = options.docsPath || 'docs'
  if (!fs.existsSync(docsPath)) {
    reporter.info(`creating the ${docsPath} directory`)
    fs.mkdirSync(docsPath)
  }
}

exports.sourceNodes = ({ actions, schema }) => {
  const { createTypes } = actions
  createTypes([
    schema.buildObjectType({
      name: `Docs`,
      fields: {
        id: { type: `ID!` },
        slug: {
          type: 'String!',
        },
        title: {
          type: 'String!',
        },
        description: {
          type: 'String',
        },
        metaTitle: {
          type: 'String',
        },
        metaDescription: {
          type: 'String',
        },
        order: {
          type: 'String!',
        },
        excerpt: {
          type: 'String!',
          resolve(source, _args, context, info) {
            const type = info.schema.getType(`Mdx`)
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const resolver = type.getFields()['excerpt'].resolve
            return resolver(mdxNode, {}, context, {
              fieldName: 'excerpt',
            })
          },
        },
        tableOfContents: {
          type: 'JSON!',
          resolve(source, _args, context, info) {
            const type = info.schema.getType(`Mdx`)
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const resolver = type.getFields()['tableOfContents'].resolve
            return resolver(mdxNode, {}, context, {
              fieldName: 'tableOfContents',
            })
          },
        },
        body: {
          type: 'String!',
          resolve(source, _args, context, info) {
            const type = info.schema.getType(`Mdx`)
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent,
            })
            const resolver = type.getFields()['body'].resolve
            return resolver(mdxNode, {}, context, {
              fieldName: 'body',
            })
          },
        },
        rawBody: {
          type: 'String!',
        },
      },
      interfaces: [`Node`],
    }),
    schema.buildObjectType({
      name: `Menu`,
      fields: {
        id: { type: `ID!` },
        data: {
          type: 'JSON!',
        },
      },
      interfaces: [`Node`],
    }),
  ])
}

exports.createPages = async (
  { actions, graphql, reporter, createContentDigest },
  { sidebar, search = true }
) => {
  const { createPage, createNode } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allDocs {
              edges {
                node {
                  id
                  order
                  slug
                  title
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          reporter.panicOnBuild(`Error while running GraphQL query.`)
          return
        }

        const treeData = calculateTreeData(sidebar, result.data.allDocs.edges)

        const data = flattenTree(treeData)

        reporter.verbose(
          `Creating menu data node\n${JSON.stringify(treeData, null, 2)}`
        )
        reporter.verbose(`Page ordering\n${JSON.stringify(data, null, 2)}`)

        data.forEach((item, index) => {
          let previous
          let next

          if (index > 0) {
            previous = data[index - 1]
          }
          if (index >= 0 && index < data.length - 1) {
            next = data[index + 1]
          }

          createPage({
            path: item.url,
            component: path.resolve(`${__dirname}/src/layout/docs.tsx`),
            context: {
              layout: 'docs',
              current: item,
              id: item.id,
              previous,
              next,
            },
          })
        })

        createPage({
          path: '/print',
          component: path.resolve(`${__dirname}/src/layout/print.tsx`),
          context: {
            layout: 'print',
            data,
          },
        })

        if (search) {
          createPage({
            path: '/search',
            component: path.resolve(`${__dirname}/src/layout/search.tsx`),
            context: {
              layout: 'docs',
              data,
            },
          })
        }

        const fieldData = {
          data: treeData,
        }
        createNode({
          ...fieldData,
          // Required fields.
          id: 'menu', //createNodeId(`${node.id} >>> Menu`),
          //children: [],
          internal: {
            type: `Menu`,
            content: JSON.stringify(fieldData),
            description: `Menu`,
            contentDigest: createContentDigest(fieldData),
          },
        })
      })
    )
  })
}

const makeTitle = (node, parent, slug) => {
  let title
  if (node.frontmatter.title) {
    title = node.frontmatter.title
  } else if (parent.name === 'index') {
    title = startCase(slug.substring(slug.lastIndexOf('/') + 1))
  }
  if (!title || title === '') {
    title = startCase(parent.name)
  }
  return title
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode, createParentChildLink } = actions
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const slug = makeSlug(parent)
    const title = makeTitle(node, parent, slug)

    reporter.verbose(
      `${slug} added from file ${parent.relativePath} with title ${title}`
    )

    if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'docs'
    ) {
      const fieldData = {
        title,
        description: node.frontmatter.description || '',
        slug,
        metaTitle: node.frontmatter.metaTitle || title || '',
        metaDescription:
          node.frontmatter.metaDescription ||
          node.frontmatter.description ||
          node.excerpt ||
          '',
        excerpt: node.excerpt,
        order: node.frontmatter.order || title || 999999,
        tableOfContents: node.tableOfContents,
        rawBody: node.rawBody,
      }

      createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id} >>> Docs`),
        parent: node.id,
        children: [],
        internal: {
          type: `Docs`,
          content: JSON.stringify(fieldData),
          description: `Documentation`,
          contentDigest: createContentDigest(fieldData),
        },
      })
      createParentChildLink({
        parent: parent,
        child: node,
      })
    }
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type AuthorJson implements Node {
      joinedAt: Date
    }
  `

  createTypes(typeDefs)
}
