import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/Layout"
import { Markdown } from "../components/Markdown"

export default ({ location, data }) => {
  const {
    mdx,
    site: {
      siteMetadata: { docsLocation, title },
    },
  } = data
  return (
    <Layout location={location} title={title}>
      <Markdown>{mdx.body}</Markdown>
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
