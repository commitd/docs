import React from 'react'
import { Item, Info, Node } from '../types'
import {
  useTheme,
  Theme,
  List,
  Icons,
  ListItem,
  ListItemText,
  Collapse
} from '@commitd/components'

export interface TreeNodeProps extends Item {
  isActive: (key: string) => boolean
  navigate: (key: string) => void
  setCollapsed: (key: string) => void
  collapsed: { [key: string]: boolean }
  level: number
  info?: Info
  id: string
}

const firstUrl = ({ items, info }: Node) => {
  if (info) {
    return info.url
  } else {
    if (items.length === 0) {
      return '404'
    } else {
      return firstUrl(items[0])
    }
  }
}

export const TreeNode = ({
  id,
  isActive,
  navigate,
  setCollapsed,
  collapsed,
  level,
  label,
  info,
  items,
  ...rest
}: TreeNodeProps) => {
  const theme = useTheme<Theme>()
  const url = firstUrl({ items, info })
  const isCollapsed = collapsed[id] || false
  const hasChildren = items.length !== 0
  const title = info ? info.title : label
  const active = isActive(url)
  return (
    <>
      <ListItem
        style={{
          paddingLeft: theme.spacing(2) * (level + 1)
        }}
        selected={active}
        button
        onClick={() => {
          setCollapsed(id)
          navigate(url)
        }}
      >
        <ListItemText primary={title} />
        {title && hasChildren ? (
          <>
            {!isCollapsed ? (
              <Icons.KeyboardArrowDown />
            ) : (
              <Icons.KeyboardArrowRight />
            )}
          </>
        ) : null}
      </ListItem>

      {hasChildren ? (
        <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
          <List dense disablePadding>
            {items.map(item => (
              <TreeNode
                key={item.label}
                isActive={isActive}
                navigate={navigate}
                setCollapsed={setCollapsed}
                collapsed={collapsed}
                level={level + 1}
                {...item}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  )
}
export default TreeNode
