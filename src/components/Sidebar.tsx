import React from "react"
import { Tree } from "./Tree"
import { ExternalLink } from "./Link"
import { StaticQuery, graphql } from "gatsby"
import {
  styled,
  Icons,
  Flex,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@commitd/components"
import config from "../../config"

const ActiveListItem = styled(ListItem)({
  color: "primary",
})

export interface SidebarProps {
  location: string
}

export const Sidebar = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              id
              fields {
                slug
                title
              }
              frontmatter {
                order
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <>
          <Tree location={location} edges={allMdx.edges} />
          <Divider />
          <List>
            {config.sidebar.links.map((link, key) => {
              if (link.link !== "" && link.text !== "") {
                return (
                  <ExternalLink key={key} href={link.link}>
                    <ListItem button>
                      <ListItemText primary={link.text} />
                      <Icons.ExitToApp color="disabled" />
                    </ListItem>
                  </ExternalLink>
                )
              }
            })}
          </List>
        </>
      )
    }}
  />
)
