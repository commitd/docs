import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Markdown } from '../components/Markdown'

export default ({ location, data }) => {
  const {
    docs: {
      body,
      metaDescription,
      metaTitle,
      order,
      slug,
      tableOfContents,
      title
    }
  } = data
  return (
    <Layout location={location} title={metaTitle} description={metaDescription}>
      <Markdown>{body}</Markdown>
    </Layout>
  )
}

export const pageQuery = graphql`
  query DocQuery($id: String!) {
    docs(id: { eq: $id }) {
      metaDescription
      metaTitle
      order
      slug
      tableOfContents
      title
      body
    }
  }
`
