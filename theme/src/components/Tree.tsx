import React, { useState } from 'react'
import { Node } from '../types'
import TreeNode from './TreeNode'
import { navigate } from 'gatsby'
import { firstUrl } from '../util/tree'
import { useHotkeys } from 'react-hotkeys-hook'
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

  const isParent = (item: Node) =>
    (location &&
      (location.pathname.startsWith(item.slug) ||
        location.pathname.startsWith(prefix + item.slug))) ||
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

  const navigateItem = (index: number) => {
    navigateTo(firstUrl(treeData.items[index]))
  }

  const index = treeData.items.findIndex(item => isParent(item))

  if (index == -1) {
    useHotkeys('shift+down', () => navigateItem(0))
  } else {
    if (index == 0) {
      useHotkeys('shift+up', () => navigate('/'))
    }
    if (index > 0) {
      if (isActive(firstUrl(treeData.items[index]))) {
        useHotkeys('shift+up', () => navigateItem(index - 1))
      } else {
        useHotkeys('shift+up', () => navigateItem(index))
      }
    }
    if (index < treeData.items.length - 1) {
      useHotkeys('shift+down', () => navigateItem(index + 1))
    }
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
