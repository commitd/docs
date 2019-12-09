import React, { useContext } from 'react'
import { Item } from '../types'
import TreeNode from './TreeNode'
import { DocsContext } from './Layout'
import { withPrefix } from 'gatsby'
import { firstUrl, firstInfo } from '../util/tree'
import { useHotkeys } from 'react-hotkeys-hook'
import { List } from '@committed/components'

export interface TreeProps {
  location: any
  data: Item
  ignoreIndex?: boolean
  current?: string
}

export const Tree = ({
  location,
  ignoreIndex = true,
  current = '',
  data
}: TreeProps) => {
  const { navigate, collapsed, setCollapsed } = useContext(DocsContext)
  const isActive = (id: string) => current === id

  const isParent = (item: Item) =>
    (location &&
      location.pathname &&
      location.pathname.startsWith(withPrefix(item.slug))) ||
    false

  const toggle = id => {
    setCollapsed({
      ...collapsed,
      [id]: !collapsed[id]
    })
  }

  const navigateItem = (index: number) => {
    navigate(firstUrl(data.items[index]))
  }

  const index = data.items.findIndex(item => isParent(item))

  if (index == -1) {
    useHotkeys('shift+down', () => navigateItem(0))
  } else {
    if (index == 0) {
      useHotkeys('shift+up', () => navigate('/'))
    }
    if (index > 0) {
      if (isActive(firstInfo(data.items[index]).id)) {
        useHotkeys('shift+up', () => navigateItem(index - 1))
      } else {
        useHotkeys('shift+up', () => navigateItem(index))
      }
    }
    if (index < data.items.length - 1) {
      useHotkeys('shift+down', () => navigateItem(index + 1))
    }
  }

  return (
    <List dense>
      {!ignoreIndex && (
        <TreeNode
          key={`index`}
          navigate={navigate}
          isActive={isActive}
          level={0}
          id={data.id}
          info={data.info}
          label={data.label}
          setCollapsed={toggle}
          collapsed={collapsed}
          items={[]}
        />
      )}
      {data.items.map((item, index) => (
        <TreeNode
          key={`${item.label}-${item.info && item.info.url}`}
          navigate={navigate}
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
