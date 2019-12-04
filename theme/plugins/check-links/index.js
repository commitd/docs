// Code adapted from https://github.com/trevorblades/gatsby-remark-check-links
const visit = require('unist-util-visit')

function getCacheKey(node) {
  return `check-links-${node.id}-${node.internal.contentDigest}`
}

function getHeadingsMapKey(link, path) {
  let key = link
  const hashIndex = link.indexOf('#')
  const hasHash = hashIndex !== -1
  if (hasHash) {
    key = link.startsWith('#') ? path : link.slice(0, hashIndex)
  }

  return {
    key,
    hasHash,
    hashIndex
  }
}

function createPathPrefixer(pathPrefix) {
  return function withPathPrefix(url) {
    const prefixed = pathPrefix + url
    return prefixed.replace(/\/\//, '/')
  }
}

module.exports = async (
  { markdownAST, markdownNode, files, getNode, cache, getCache, pathPrefix },
  { exceptions = [], ignore = [], verbose = true } = {}
) => {
  const parent = await getNode(markdownNode.parent)
  let slug = '/' + parent.relativePath.replace(parent.ext, '')
  if (slug === '/index') {
    slug = '/'
  }

  const links = []
  const headings = []

  function visitor(node, index, parent) {
    if (parent.type === 'heading') {
      headings.push(parent.data.id)
      return
    }

    if (node.url.startsWith('#') || /^\.{0,2}\//.test(node.url)) {
      links.push({
        ...node,
        frontmatter: markdownNode.frontmatter
      })
    }
  }

  visit(markdownAST, 'link', visitor)

  const withPathPrefix = createPathPrefixer(pathPrefix)
  const setAt = Date.now()
  cache.set(getCacheKey(parent), {
    path: withPathPrefix(slug),
    links,
    headings,
    setAt
  })

  // wait to see if all of the Markdown and MDX has been visited
  const linksMap = {}
  const headingsMap = {}
  for (const file of files) {
    if (
      /^mdx?$/.test(file.extension) &&
      file.relativePath !== 'docs/README.md'
    ) {
      const key = getCacheKey(file)

      let visited = await cache.get(key)
      if (!visited && getCache) {
        // the cache provided to `gatsby-mdx` has its own namespace, and it
        // doesn't have access to `getCache`, so we have to check to see if
        // those files have been visited here.
        const mdxCache = getCache('gatsby-plugin-mdx')
        visited = await mdxCache.get(key)
      }

      if (visited && setAt >= visited.setAt) {
        linksMap[visited.path] = visited.links
        headingsMap[visited.path] = visited.headings
        continue
      }

      // don't continue if a page hasn't been visited yet
      return markdownAST
    }
  }

  let totalBrokenLinks = 0
  const prefixedIgnore = ignore.map(withPathPrefix)
  const prefixedExceptions = exceptions.map(withPathPrefix)
  for (const path in linksMap) {
    if (prefixedIgnore.includes(path)) {
      // don't count broken links for ignored pages
      continue
    }

    const linksForPath = linksMap[path]
    if (linksForPath.length) {
      const brokenLinks = linksForPath.filter(link => {
        // return true for broken links, false = pass
        const { key, hasHash, hashIndex } = getHeadingsMapKey(link.url, path)
        if (prefixedExceptions.includes(key)) {
          return false
        }

        const headings = headingsMap[key]
        if (headings) {
          if (hasHash) {
            const id = link.url.slice(hashIndex + 1)
            return !prefixedExceptions.includes(id) && !headings.includes(id)
          }

          return false
        }

        return true
      })

      const brokenLinkCount = brokenLinks.length
      totalBrokenLinks += brokenLinkCount
      if (brokenLinkCount && verbose) {
        console.warn(`${brokenLinkCount} broken links found on ${path}`)
        for (const link of brokenLinks) {
          let prefix = '-'
          if (link.position) {
            const { line, column } = link.position.start

            // account for the offset that frontmatter adds
            const offset = link.frontmatter
              ? Object.keys(link.frontmatter).length + 2
              : 0

            prefix = [
              String(line + offset).padStart(3, ' '),
              String(column).padEnd(4, ' ')
            ].join(':')
          }
          console.warn(`${prefix} ${link.url}`)
        }
        console.log('')
      }
    }
  }

  if (totalBrokenLinks) {
    const message = `${totalBrokenLinks} broken links found`
    if (process.env.NODE_ENV === 'production') {
      // break builds with broken links before they get deployed for real
      throw new Error(message)
    }

    if (verbose) {
      console.error(message)
    }
  } else if (verbose) {
    console.info('No broken links found')
  }

  return markdownAST
}
