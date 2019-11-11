import React from 'react'
import { Tree } from './Tree'
import { Node } from '../types'
import { ClearLink } from './Link'
import {
  Icons,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@commitd/components'

export interface SidebarProps {
  prefix: string
  treeData: Node
  location?: string
  sidebar: {
    links: { text: string; link: string }[]
  }
}

export const Sidebar = ({ prefix, location, treeData, sidebar }) => (
  <>
    <Tree prefix={prefix} location={location} treeData={treeData} />
    <Divider />
    <List>
      {sidebar.links.map((link, key) => {
        if (link.link !== '' && link.text !== '') {
          return (
            <ClearLink key={key} href={link.link}>
              <ListItem button>
                <ListItemText primary={link.text} />
                <Icons.ExitToApp color="disabled" />
              </ListItem>
            </ClearLink>
          )
        }
      })}
    </List>
  </>
)
