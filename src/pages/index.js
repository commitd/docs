import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Layout } from "../components/Layout"
import { Box, Button, Display, Typography, Icons } from "@commitd/components"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Layout title="Home">
      <Display.d1 my={3}>Hi people</Display.d1>
      <Typography>Welcome to your new documentation site.</Typography>
      <Typography>Now go write some docs.</Typography>
      <Box my={3} maxWidth={300}>
        <Img fluid={data.placeholderImage.childImageSharp.fluid} />
      </Box>
      <Link to="/instructions/">
        <Button color="primary">
          Instructions <Icons.NavigateNext mx={1} />
        </Button>
      </Link>
    </Layout>
  )
}
