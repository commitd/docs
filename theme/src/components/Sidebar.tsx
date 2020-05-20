import React from 'react'
import { Tree } from './Tree'
import { ClearLink } from './Link'
import { useStaticQuery, graphql } from 'gatsby'
import { Icons, Divider, List } from '@committed/components'
import { NavListItem } from '@committed/layout'

export interface SidebarProps {
  location: any
  current: string
}

export const Sidebar = ({ location, current }: SidebarProps) => {
  const {
    menu: { data: data },
    site: {
      siteMetadata: { sidebar: sidebar },
    },
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
          .filter((link) => link.link !== '' && link.text !== '')
          .map((link, key) => (
            <ClearLink key={key} href={link.link}>
              <NavListItem
                text={link.text}
                icon={<Icons.ExitToApp color="disabled" />}
              />
            </ClearLink>
          ))}
      </List>
    </>
  )
}
