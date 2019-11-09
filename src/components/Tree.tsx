import React, { useState } from "react"
import config from "../../config"
import { Item, Node } from "../types"
import TreeNode from "./TreeNode"
import { navigate } from "gatsby"
import { List } from "@commitd/components"

export interface TreeProps {
  location?: any
  treeData: Node
}

export const Tree = ({ location, treeData }: TreeProps) => {
  const isActive = url =>
    (location &&
      (location.pathname === url ||
        location.pathname === config.gatsby.pathPrefix + url)) ||
    false

  const [collapsed, setCollapsed] = useState((location && location.state) || {})

  const navigateTo = url => {
    navigate(url, {
      state: collapsed,
    })
  }

  const toggle = id => {
    setCollapsed({
      ...collapsed,
      [id]: !collapsed[id],
    })
  }
  return (
    <List dense>
      {treeData.items.map(item => (
        <TreeNode
          key={`${item.label}-${item.info && item.info.url}`}
          navigate={navigateTo}
          isActive={isActive}
          level={0}
          setCollapsed={toggle}
          collapsed={collapsed}
          {...item}
        />
      ))}
    </List>
  )
}
