
var loaderUtils = require('loader-utils')
var { parseHTML } = require('./parse')
module.exports = function (source) {
  // this.resourcePath
  let tree = parseHTML(source)
  let template = null;
  let script = null;
  for (let node of tree.children) {
    if (node.tagName == 'template') {
      template = node.children.filter((e) => e.type !== 'text')[0];
    }
    if (node.tagName == 'script') {
      script = node.children[0].content
    }
  }
  let visit = (node) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content)
    }
    let attrs = {}
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value
    }
    let children = node.children.map(node => visit(node))
    return `createElement("${node.tagName}",${JSON.stringify(attrs)},${children})`
  }
  let r = `
    import {createElement,Text,Wrapper} from './createElement'
    export class Carousel {
      setAttribute(name, value) {
        this[name] = value
      }
      render() {
        return ${visit(template)}
      }
      mountTo(parent) {
        console.log('loader/mountTo')
        document.body.appendChild(document.createElement('div'))
        this.render().mountTo(parent)
      }
    }
  `
  console.log(r)
  return r
}