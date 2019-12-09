const startCase = require('lodash.startcase')

const calculateTree = edges =>
  edges.reduce(
    (accu, { node: { id, slug, title, order } }) => {
      const parts = slug.split('/')
      let { items: prevItems } = accu
      let existingItem
      if (slug === '/') {
        existingItem = accu
      } else {
        let tmpSlug = ''
        for (const part of parts.slice(1, -1)) {
          tmpSlug = `${tmpSlug}/${part}`
          let tmp = prevItems.find(({ slug }) => slug == tmpSlug)
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
        existingItem = prevItems.find(
          ({ label }) => label === startCase(parts[parts.length - 1])
        )
      }

      let url = slug
      let fixedSlug = slug

      const info = { id: id, url: url, order: order || title, title }
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
    { slug: '/', label: 'index', items: new Array() }
  )

const itemOrder = item => (item.info ? item.info.order : item.label)

const sortItems = items =>
  items.sort((a, b) =>
    itemOrder(a).localeCompare(itemOrder(b), 'en', { numeric: true })
  )

const sortNode = node => {
  node.items.forEach(node => sortNode(node))
  node.items = sortItems(node.items)
  return node
}

exports.calculateTreeData = (sidebar, edges) => {
  return sortNode(calculateTree(edges))
}

const flattenNode = (flattened, node) => {
  if (node.info) {
    flattened.push(node.info)
  }
  node.items.forEach(item => flattenNode(flattened, item))
}

exports.flattenTree = root => {
  const flattened = new Array()
  flattenNode(flattened, root)
  return flattened
}
