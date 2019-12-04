import { Item, Node, Info, Sidebar, Doc } from '../types'
import startCase from 'lodash.startcase'

export interface Edge {
  node: Doc
}

export const firstUrl = ({ items, info }: Node) => {
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

const calculateTree = (edges: Edge[]) =>
  edges.reduce(
    (accu, { node: { id, slug, title, order } }) => {
      const parts = slug.replace(/\/index$/, '').split('/')
      let { items: prevItems } = accu
      let tmpSlug = ''
      for (const part of parts.slice(1, -1)) {
        tmpSlug = `${tmpSlug}/${part}`
        let tmp = prevItems.find(({ label }) => label == startCase(part))
        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = { id: part, slug: tmpSlug, label: startCase(part), items: [] }
          prevItems.push(tmp)
        }
        prevItems = tmp.items
      }
      const existingItem = prevItems.find(
        ({ label }) => label === startCase(parts[parts.length - 1])
      )
      let url = slug
      let fixedSlug = slug
      if (slug.endsWith('/index')) {
        if (title === 'Index') {
          title = startCase(parts[parts.length - 1])
        }
        fixedSlug = slug.slice(0, -6)
      }
      const info = { url: url, order: order || title, title }
      if (existingItem) {
        existingItem.id = id
        existingItem.info = info
      } else {
        prevItems.push({
          id,
          slug: fixedSlug,
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
