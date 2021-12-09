const visit = require('unist-util-visit')
module.exports = ({ markdownAST }, pluginOptions) => {
  const protocols = ['mailto:', 'http://', 'ftp:', 'https://']
  visit(markdownAST, 'link', (node) => {
    // Any link we find which isn't internal, then ignore it
    if (protocols.find((p) => node.url.startsWith(p))) {
      return
    }
    node.url = node.url.replace(/\.mdx?$/, '')
  })
  return markdownAST
}
