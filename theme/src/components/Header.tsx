import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ClearLink } from './Link'
import { Box, Flex, Logo, Button, Heading, Icons } from '@commitd/components'

export const Header = () => {
  const {
    site: {
      siteMetadata: {
        header: { title, helpUrl, logo, links }
      }
    }
  } = useStaticQuery(
    graphql`
      query headerQuery {
        site {
          siteMetadata {
            header {
              title
              helpUrl
              logo {
                link
                image
              }
              links {
                link
                text
              }
            }
          }
        }
      }
    `
  )
  const finalLogoLink = logo.link !== '' ? logo.link : '/'
  return (
    <>
      <Flex color="white" flexGrow={1}>
        <ClearLink href={finalLogoLink}>
          <Flex color="white">
            <Box mx={2}>
              {logo.image !== '' ? (
                <img src={logo.image} alt="logo" />
              ) : (
                <Logo size={24} />
              )}
            </Box>
            <Heading.h1>{title}</Heading.h1>
          </Flex>
        </ClearLink>
      </Flex>
      {links
        .filter(link => link.link !== '' && link.text !== '')
        .map((link, key) => (
          <ClearLink key={key} href={link.link}>
            <Button color="inherit" variant="text">
              {link.text}
            </Button>
          </ClearLink>
        ))}
      {helpUrl !== '' ? (
        <a href={helpUrl}>
          <Icons.Help />
        </a>
      ) : null}
    </>
  )
}
