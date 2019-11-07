import { Link as GatsbyLink } from "gatsby"
import { styled } from "@commitd/components"

export const Link = styled(GatsbyLink)({
  textDecoration: "none",
  color: "inherit",
})

export const ExternalLink = styled("a")({
  textDecoration: "none",
  color: "inherit",
})
