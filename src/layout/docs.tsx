import React from "react"
import { Link, graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"

export default ({ data }) => {
  const {
    allMdx,
    mdx,
    site: {
      siteMetadata: { docsLocation, title },
    },
  } = data
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <MDXRenderer>{mdx.body}</MDXRenderer>
      <h2>Sidebar</h2>
      <div>
        {allMdx.edges.map(edge => (
          <li>
            <Link to={edge.node.fields.slug}>{edge.node.fields.title}</Link>
          </li>
        ))}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
        docsLocation
      }
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        id
        title
        slug
      }
      body
      tableOfContents
      parent {
        ... on File {
          relativePath
        }
      }
      frontmatter {
        metaTitle
        metaDescription
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
`
