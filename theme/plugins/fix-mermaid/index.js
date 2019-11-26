const visit = require('unist-util-visit')
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'html', node => {
    let { value, lang } = node
    if (lang === 'mermaid') {
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
