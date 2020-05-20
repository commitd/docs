const visit = require('unist-util-visit')
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'html', (node) => {
    let { value, lang } = node
    if (lang === 'mermaid') {
      // Remove first style tag - then we can just use a single import
      value = value.replace(/<style>.*?<\/style>/s, '')
      // Remove absolute url, added as bug from mermaid
      value = value.replace(
        /url\([\w:\/\-._]*#arrowhead/g,
        'url(#arrowhead',
        'g'
      )
    }
    node.value = value
  })
  return markdownAST
}
