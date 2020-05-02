import { Column } from '@committed/components'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Classification } from './Classification'

export const Header = () => {
  const {
    site: {
      siteMetadata: {
        print: { classification }
      }
    }
  } = useStaticQuery(
    graphql`
      query printHeaderQuery {
        site {
          siteMetadata {
            print {
              classification
              reference
            }
          }
        }
      }
    `
  )

  return (
    <Column
      className="header"
      bgcolor="white"
      flexGrow={1}
      alignItems="center"
      p={3}
      position="fixed"
      top={0}
      width="100%"
    >
      <Classification>{classification}</Classification>
    </Column>
  )
}
