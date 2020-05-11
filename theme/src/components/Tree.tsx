import { List } from '@committed/components'
import { withPrefix } from 'gatsby'
import React, { useCallback, useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Item } from '../types'
import { firstInfo, firstUrl } from '../util/tree'
import { DocsContext } from './Layout'
import TreeNode from './TreeNode'

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

  const navigateDown = useCallback(() => {
    if (index === -1) {
      navigateItem(0)
    } else if (index < data.items.length - 1) {
      navigateItem(index + 1)
    }
  }, [navigateItem, index, data])

  const navigateUp = useCallback(() => {
    if (index === 0) {
      navigate('/')
    } else if (index > 0) {
      if (isActive(firstInfo(data.items[index]).id)) {
        navigateItem(index - 1)
      } else {
        navigateItem(index)
      }
    }
  }, [navigateItem, index, data, firstInfo, isActive])

  useHotkeys('shift+down', navigateDown, [navigateDown])
  useHotkeys('shift+up', navigateUp, [navigateUp])

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
