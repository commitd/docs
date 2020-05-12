import { Box, Button, Flex, Heading, Icons, Logo } from '@committed/components'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { ClearLink } from './Link'

export const Header = () => {
  const {
    site: {
      siteMetadata: {
        header: { title, helpUrl, logo, links },
        search,
      },
    },
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
            search
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
            <Heading.h1 style={{ fontSize: '1.5rem' }}>{title}</Heading.h1>
          </Flex>
        </ClearLink>
      </Flex>
      {links
        .filter((link) => link.link !== '' && link.text !== '')
        .map((link, key) => (
          <ClearLink key={key} href={link.link}>
            <Button color="inherit" variant="text">
              {link.text}
            </Button>
          </ClearLink>
        ))}
      {search ? (
        <ClearLink href="/search">
          <Button color="inherit" variant="text">
            <Icons.Search />
          </Button>
        </ClearLink>
      ) : null}
      {helpUrl !== '' ? (
        <a href={helpUrl}>
          <Icons.Help />
        </a>
      ) : null}
    </>
  )
}
