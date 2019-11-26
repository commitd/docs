import { Item, Node, Info, Sidebar, Doc } from '../types'
import startCase from 'lodash.startcase'

export interface Edge {
  node: Doc
}

const calculateTree = (edges: Edge[]) =>
  edges.reduce(
    (accu, { node: { id, slug, title, order } }) => {
      const parts = slug.replace(/\/index$/, '').split('/')
      let { items: prevItems } = accu
      for (const part of parts.slice(1, -1)) {
        let tmp = prevItems.find(({ label }) => label == startCase(part))
        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = { id: part, label: startCase(part), items: [] }
          prevItems.push(tmp)
        }
        prevItems = tmp.items
      }
      const existingItem = prevItems.find(
        ({ label }) => label === startCase(parts[parts.length - 1])
      )
      if (slug.endsWith('/index')) {
        if (title === 'Index') {
          title = startCase(parts[parts.length - 1])
        }
      }
      const info = { url: slug, order: order || title, title }
      if (existingItem) {
        existingItem.id = id
        existingItem.info = info
      } else {
        prevItems.push({
          id,
          label: startCase(parts[parts.length - 1]),
          items: [],
          info
        })
      }
      return accu
    },
    { items: new Array<Item>() }
  )

const itemOrder = (item: Item) => (item.info ? item.info.order : item.label)

const sortItems = (items: Item[]) =>
  items.sort((a, b) =>
    itemOrder(a).localeCompare(itemOrder(b), 'en', { numeric: true })
  )

const sortNode = (node: Node) => {
  node.items.forEach(node => sortNode(node))
  node.items = sortItems(node.items)
  return node
}

export const calculateTreeData = (sidebar: Sidebar, edges: Edge[]) => {
  const filtered = sidebar.ignoreIndex
    ? edges.filter(({ node: { slug } }) => slug !== '/')
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
