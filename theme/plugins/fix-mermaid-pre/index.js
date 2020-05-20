const visit = require('unist-util-visit')
module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'code', (node) => {
    let { value, lang } = node
    if (lang === 'mermaid') {
      value = value.replace(/<<(join|fork)>>/g, '[[$1]]', 'g')
      value = value.replace(/<<(\w*)>>/g, '&lt;&lt;$1&gt;&gt;', 'g')
    }
    node.value = value
  })
  return markdownAST
}
