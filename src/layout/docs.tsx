import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../components/Layout"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"

export default ({ location, data }) => {
  const {
    mdx,
    site: {
      siteMetadata: { docsLocation, title },
    },
  } = data
  return (
    <Layout location={location} title={title}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
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
  }
`
