import React, { useState } from 'react'
import { Node } from '../types'
import TreeNode from './TreeNode'
import { navigate } from 'gatsby'
import { List } from '@committed/components'

export interface TreeProps {
  location?: any
  prefix: string
  treeData: Node
}

export const Tree = ({ prefix, location, treeData }: TreeProps) => {
  const isActive = url =>
    (location &&
      (location.pathname === url || location.pathname === prefix + url)) ||
    false

  const [collapsed, setCollapsed] = useState((location && location.state) || {})

  const navigateTo = url => {
    navigate(url, {
      state: collapsed
    })
  }

  const toggle = id => {
    setCollapsed({
      ...collapsed,
      [id]: !collapsed[id]
    })
  }
  return (
    <List dense>
      {treeData.items.map((item, index) => (
        <TreeNode
          key={`${item.label}-${(item.info && item.info.url) || index}`}
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
