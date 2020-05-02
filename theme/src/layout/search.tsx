import { graphql } from 'gatsby'
import React from 'react'
import { Search } from '../components/Search'
import '../style/mermaid.css'

export default ({ data }) => {
  const {
    siteSearchIndex: { index },
  } = data
  return <Search index={index} />
}

export const pageQuery = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`
