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

exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const pathPrefix = options.pathPrefix || '/'
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    id
                  }
                  tableOfContents
                  fields {
                    slug
                  }
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
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug ? node.fields.slug : pathPrefix,
            component: path.resolve(`${__dirname}/src/layout/docs.tsx`),
            context: {
              id: node.fields.id
            }
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    let value = parent.relativePath.replace(parent.ext, '')

    if (value === 'index') {
      value = ''
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title || startCase(parent.name)
    })
  }
}
