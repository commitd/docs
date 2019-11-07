import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ClearLink } from "./Link"
import config from "../../config.js"
import {
  styled,
  Box,
  Flex,
  Logo,
  Button,
  Heading,
  Icons,
} from "@commitd/components"

export const Header = () => {
  const {
    site: {
      siteMetadata: { headerTitle, helpUrl, logo, headerLinks },
    },
  } = useStaticQuery(
    graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            helpUrl
            logo {
              link
              image
            }
            headerLinks {
              link
              text
            }
          }
        }
      }
    `
  )
  const finalLogoLink = logo.link !== "" ? logo.link : "/"
  return (
    <>
      <Flex color="white" flexGrow={1}>
        <ClearLink href={finalLogoLink}>
          <Flex color="white">
            <Box mx={2}>
              {logo.image !== "" ? (
                <img src={logo.image} alt="logo" />
              ) : (
                <Logo size={24} />
              )}
            </Box>
            <Heading.h1>{headerTitle}</Heading.h1>
          </Flex>
        </ClearLink>
      </Flex>
      {headerLinks.map((link, key) => {
        if (link.link !== "" && link.text !== "") {
          return (
            <ClearLink key={key} href={link.link}>
              <Button color="inherit" variant="text">
                {link.text}
              </Button>
            </ClearLink>
          )
        }
      })}
      {helpUrl !== "" ? (
        <a href={helpUrl}>
          <Icons.Help />
        </a>
      ) : null}
    </>
  )
}
