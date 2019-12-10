const startCase = require('lodash.startcase')

exports.makeSlug = parent => {
  return `/${parent.relativePath}`
    .replace(parent.ext, '') // remove file extension
    .replace(/\/?index$/, '/') // change 'index' for trailing slash
    .toLowerCase()
}

const calculateTree = edges =>
  edges.reduce(
    (accu, { node: { id, slug, title, order } }) => {
      const parts = slug.split('/')
      let currentItem = accu
      let tmpSlug = '/'
      for (const part of parts.slice(1, -1)) {
        tmpSlug = `${tmpSlug}${part}/`
        let tmp = currentItem.items.find(({ slug }) => slug == tmpSlug)
        if (!tmp) {
          tmp = { id: part, slug: tmpSlug, label: startCase(part), items: [] }
          currentItem.items.push(tmp)
        }
        currentItem = tmp
      }

      if (currentItem.slug === slug) {
        if (title === 'Index') {
          title = currentItem.label
        }
        const info = { id: id, url: slug, order: order || title, title }
        currentItem.id = id
        currentItem.info = info
      } else {
        const info = { id: id, url: slug, order: order || title, title }
        currentItem.items.push({
          id,
          slug,
          label: startCase(parts[parts.length - 1]),
          items: [],
          info
        })
      }
      return accu
    },
    { slug: '/', label: 'Index', items: new Array() }
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
