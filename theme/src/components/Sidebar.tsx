import React from 'react'
import { Tree } from './Tree'
import { ClearLink } from './Link'
import { useStaticQuery, graphql } from 'gatsby'
import {
  Icons,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@committed/components'

export interface SidebarProps {
  location: any
  current: string
}

export const Sidebar = ({ location, current }: SidebarProps) => {
  const {
    menu: { data: data },
    site: {
      siteMetadata: { sidebar: sidebar }
    }
  } = useStaticQuery(
    graphql`
      query MenuQuery {
        menu(id: { eq: "menu" }) {
          data
        }
        site {
          siteMetadata {
            sidebar {
              links {
                link
                text
              }
              ignoreIndex
            }
          }
        }
      }
    `
  )
  return (
    <>
      <Tree
        location={location}
        ignoreIndex={sidebar.ignoreIndex}
        current={current}
        data={data}
      />
      <Divider />
      <List>
        {sidebar.links
          .filter(link => link.link !== '' && link.text !== '')
          .map((link, key) => (
            <ClearLink key={key} href={link.link}>
              <ListItem button>
                <ListItemText primary={link.text} />
                <Icons.ExitToApp color="disabled" />
              </ListItem>
            </ClearLink>
          ))}
      </List>
    </>
  )
}
