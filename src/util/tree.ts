import config from "../../config"
import { Item, Node, Info } from "../types"

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

export const calculateTreeData = (edges: Edge[]) => {
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

const flattenNode = (flattened: Info[], node: Node) => {
  if (node.info) {
    flattened.push(node.info)
  }
  node.items.forEach(item => flattenNode(flattened, item))
}

export const flattenTree = (root: Node) => {
  const flattened = new Array<Info>()
  flattenNode(flattened, root)
  return flattened
}
