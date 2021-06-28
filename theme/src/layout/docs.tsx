import { graphql } from 'gatsby'
import React from 'react'
import { Markdown } from '../components/Markdown'
import '../style/mermaid.css'

export default ({ data }) => {
  const {
    docs: { body },
  } = data
  return <Markdown>{body}</Markdown>
}

export const pageQuery = graphql`
  query DocQuery($id: String!) {
    docs(id: { eq: $id }) {
      body
    }
  }
`
