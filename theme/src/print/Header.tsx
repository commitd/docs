import React from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { useHotkeys } from 'react-hotkeys-hook'
import { Classification } from './Classification'
import { Column } from '@committed/components'

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
