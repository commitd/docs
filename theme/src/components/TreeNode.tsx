import {
  Collapse,
  Icons,
  List,
  ListItem,
  ListItemText,
  Theme,
  useTheme
} from '@committed/components'
import React from 'react'
import { Info, Item } from '../types'
import { firstUrl } from '../util/tree'

export interface TreeNodeProps extends Item {
  isActive: (id: string) => boolean
  navigate: (key: string) => void
  setCollapsed: (key: string) => void
  collapsed: { [key: string]: boolean }
  level: number
  info?: Info
  id: string
}

export const TreeNode = React.memo(
  ({
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
    const url = firstUrl({ id, label, items, info })
    const isCollapsed = collapsed[id] || false
    const hasChildren = items.length !== 0
    const title = info ? info.title : label
    const active = isActive(id)
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
          <ListItemText
            primary={title}
            primaryTypographyProps={{
              variant: level === 0 ? 'body1' : 'caption'
            }}
          />
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
              {items.map((item, index) => (
                <TreeNode
                  key={`${item.label}-${index}`}
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
)
export default TreeNode
