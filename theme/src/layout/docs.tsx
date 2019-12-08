import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { Markdown } from '../components/Markdown'
import '../style/mermaid.css'

export default ({ pageContext, location, data }) => {
  const {
    docs: { id, body, metaDescription, metaTitle, tableOfContents }
  } = data
  return (
    <Layout
      id={id}
      pageContext={pageContext}
      location={location}
      title={metaTitle}
      description={metaDescription}
    >
      <Markdown>{body}</Markdown>
    </Layout>
  )
}

export const pageQuery = graphql`
  query DocQuery($id: String!) {
    docs(id: { eq: $id }) {
      id
      metaDescription
      metaTitle
      tableOfContents
      body
    }
  }
`
