import React from "react"
import { Tree } from "./Tree"
import { Node } from "../types"
import { ClearLink } from "./Link"
import {
  styled,
  Icons,
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
  treeData: Node
}

export const Sidebar = ({ location, treeData }) => (
  <>
    <Tree location={location} treeData={treeData} />
    <Divider />
    <List>
      {config.sidebar.links.map((link, key) => {
        if (link.link !== "" && link.text !== "") {
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
