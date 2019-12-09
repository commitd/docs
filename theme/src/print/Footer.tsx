import React from 'react'
import logo from '../../images/Committed - Colour-128px.png'
import { useStaticQuery, graphql } from 'gatsby'
import { Classification } from './Classification'
import { Reference } from './Reference'
import { Box, Column, Row } from '@committed/components'

export const Footer = () => {
  const {
    site: {
      siteMetadata: {
        print: { classification, reference }
      }
    }
  } = useStaticQuery(
    graphql`
      query printFooterQuery {
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
    <Column width="100%" position="fixed" px={3} bottom={0} bgcolor="white">
      <Box flexGrow={1} />
      <Row flexGrow={1} py={3}>
        <Column height="100%" flexGrow={1} justifyContent="center">
          <img width="256px" src={logo} alt="Committed" />
        </Column>
        <Column alignItems="flex-end">
          <Classification>{classification}</Classification>
          <Reference>{reference}</Reference>
        </Column>
      </Row>
    </Column>
  )
}
