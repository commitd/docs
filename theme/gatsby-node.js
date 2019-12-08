const path = require('path')
const startCase = require('lodash.startcase')
const { calculateTreeData, flattenTree } = require('./src/util/node')

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
          type: 'String!'
        },
        title: {
          type: 'String!'
        },
        metaTitle: {
          type: 'String!'
        },
        metaDescription: {
          type: 'String!'
        },
        order: {
          type: 'String!'
        },
        tableOfContents: {
          type: 'Json!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`)
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            })
            const resolver = type.getFields()['tableOfContents'].resolve
            return resolver(mdxNode, {}, context, {
              fieldName: 'tableOfContents'
            })
          }
        },
        body: {
          type: 'String!',
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`)
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            })
            const resolver = type.getFields()['body'].resolve
            return resolver(mdxNode, {}, context, {
              fieldName: 'body'
            })
          }
        }
      },
      interfaces: [`Node`]
    }),
    schema.buildObjectType({
      name: `Menu`,
      fields: {
        id: { type: `ID!` },
        data: {
          type: 'Json!'
        }
      },
      interfaces: [`Node`]
    })
  ])
}

exports.createPages = async (
  { actions, graphql, reporter, createContentDigest },
  options
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
      ).then(result => {
        if (result.errors) {
          reporter.panicOnBuild(`Error while running GraphQL query.`)
          return
        }

        const treeData = calculateTreeData(
          options.sidebar,
          result.data.allDocs.edges
        )

        const data = flattenTree(treeData)

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
              id: item.id,
              previous,
              next
            }
          })
        })

        const fieldData = {
          data: treeData
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
            contentDigest: createContentDigest(fieldData)
          }
        })
      })
    )
  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createParentChildLink } = actions
  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node

    const parent = getNode(node.parent)

    // Get file path
    let value = parent.relativePath
      .replace(parent.ext, '') // remove file extension
      .replace(/\/?index$/, '') // remove tailing 'index'
      .toLowerCase()

    const title = node.frontmatter.title || startCase(parent.name)

    if (
      parent.internal.type === 'File' &&
      parent.sourceInstanceName === 'docs'
    ) {
      const fieldData = {
        title: title,
        metaTitle: node.frontmatter.metaTitle || title,
        metaDescription: node.frontmatter.metaDescription || '',
        order: node.frontmatter.order || title,
        slug: `/${value}`,
        tableOfContents: node.tableOfContents
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
          contentDigest: createContentDigest(fieldData)
        }
      })
      createParentChildLink({
        parent: parent,
        child: node
      })
    }
  }
}
