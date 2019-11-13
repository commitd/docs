const componentWithMDXScope = require('gatsby-plugin-mdx/component-with-mdx-scope')
const path = require('path')
const startCase = require('lodash.startcase')

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
  createTypes(
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
    })
  )
}

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const pathPrefix = options.pathPrefix || '/'
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allDocs {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors) // eslint-disable-line no-console
          reject(result.errors)
        }

        // Create docs pages.
        result.data.allDocs.edges.forEach(({ node }) => {
          createPage({
            path: node.slug,
            component: path.resolve(`${__dirname}/src/layout/docs.tsx`),
            context: {
              id: node.id
            }
          })
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
    let value = parent.relativePath.replace(parent.ext, '')

    if (value === 'index') {
      value = ''
    }

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
