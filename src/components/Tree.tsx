import React, { useState } from "react"
import config from "../../config"
import { Item, Node } from "../types"
import TreeNode from "./TreeNode"
import { navigate } from "gatsby"
import { List } from "@commitd/components"

export interface Edge {
  node: {
    id
    fields: {
      slug: string
      title: string
    }
    frontmatter: {
      order: string
    }
  }
}

const calculateTree = (edges: Edge[]) =>
  edges.reduce(
    (
      accu,
      {
        node: {
          id,
          fields: { slug, title },
          frontmatter: { order },
        },
      }
    ) => {
      const parts = slug.split("/")
      let { items: prevItems } = accu
      for (const part of parts.slice(1, -1)) {
        let tmp = prevItems.find(({ label }) => label == part)
        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = { label: part, items: [] }
          prevItems.push(tmp)
        }
        prevItems = tmp.items
      }
      const existingItem = prevItems.find(
        ({ label }) => label === parts[parts.length - 1]
      )
      const info = { url: slug, order: order || title, title }
      if (existingItem) {
        existingItem.id = id
        existingItem.info = info
      } else {
        prevItems.push({
          id,
          label: parts[parts.length - 1],
          items: [],
          info,
        })
      }
      return accu
    },
    { items: new Array<Item>() }
  )

const itemOrder = (item: Item) => (item.info ? item.info.order : item.label)

const sortItems = (items: Item[]) =>
  items.sort((a, b) =>
    itemOrder(a).localeCompare(itemOrder(b), "en", { numeric: true })
  )

const sortNode = (node: Node) => {
  node.items.forEach(node => sortNode(node))
  node.items = sortItems(node.items)
  return node
}

const calculateTreeData = edges => {
  const filtered = config.sidebar.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug },
          },
        }) => slug !== "/"
      )
    : edges
  return sortNode(calculateTree(filtered))
}

export interface TreeProps {
  location?: any
  edges: Edge[]
}

export const Tree = ({ location, edges }: TreeProps) => {
  const isActive = url =>
    (location &&
      (location.pathname === url ||
        location.pathname === config.gatsby.pathPrefix + url)) ||
    false

  const [treeData] = useState(() => calculateTreeData(edges))
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
