import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Markdown } from '../components/Markdown'

export default ({ location, data }) => {
  const {
    mdx: {
      body,
      tableOfContents,
      frontmatter: { metaTitle, metaDescription }
    }
  } = data
  return (
    <Layout location={location} title={metaTitle} description={metaDescription}>
      <Markdown>{body}</Markdown>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      body
      tableOfContents
      frontmatter {
        metaTitle
        metaDescription
      }
    }
  }
`
