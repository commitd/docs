import { StaticQuery, graphql } from 'gatsby'
import React from 'react'
import { Search } from '../components/Search'
import '../style/mermaid.css'

export default () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={({ siteSearchIndex: { index } }) => <Search index={index} />}
  />
)
