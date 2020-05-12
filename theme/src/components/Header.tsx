import {
  Box,
  Button,
  Flex,
  Heading,
  Icons,
  Logo,
  ThemeChoice,
  ThemeSwitch,
  useTheme,
  makeStyles,
} from '@committed/components'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { ClearLink } from './Link'

export const useStyles = makeStyles((theme) => ({
  color: {
    '& .commit_logo': {
      stroke: theme.palette.primary.contrastText,
      fill: theme.palette.primary.contrastText,
    },
  },
}))

const ThemedLogo = () => {
  const classes = useStyles()
  return <Logo size={24} className={classes.color} />
}

export const Header = ({
  themeChoice,
  toggleThemeChoice,
}: {
  themeChoice: ThemeChoice
  toggleThemeChoice: () => void
}) => {
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
  const theme = useTheme()
  const finalLogoLink = logo.link !== '' ? logo.link : '/'
  return (
    <>
      <Flex flexGrow={1}>
        <ClearLink href={finalLogoLink}>
          <Flex color={theme.palette.type == 'light' ? 'white' : 'black'}>
            <Box mx={2}>
              {logo.image !== '' ? (
                <img src={logo.image} alt="logo" />
              ) : (
                <ThemedLogo />
              )}
            </Box>
            <Heading.h1
              style={{
                fontSize: '1.5rem',
              }}
            >
              {title}
            </Heading.h1>
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
      <ThemeSwitch
        themeChoice={themeChoice}
        toggleThemeChoice={toggleThemeChoice}
        variant="celestial"
      />
      {helpUrl !== '' ? (
        <a href={helpUrl}>
          <Icons.Help />
        </a>
      ) : null}
    </>
  )
}
