
var loaderUtils = require('loader-utils')
var { parseHTML } = require('./parse')
module.exports = function (source) {
  var options = loaderUtils.getOptions(this)
  // this.resourcePath
  let tree = parseHTML(source)
  let template = null;
  let script = null;
  for (let node of tree.children) {
    if (node.tagName == 'template') {
      template = node
    }
    if (node.tagName == 'script') {
      script = node.children[0].content
    }
  }
  let createCode = ""
  let visit = (node) => {
    if (node.type === 'text') {
      return node.content
    }
    console.log(node)
    let attrs = {}
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value
    }
    let children = node.children.map(node => visit(node))
    createCode += `
    let node${node.tagName} = create("${node.tagName}",${JSON.stringify(attrs)},${children})
    `
    return createCode
  }
  let r = `
    import {createElement, Text, Wrapper} from './createElement'
    class Carousel {
      rernder() {${visit(template)}}
    }
  `
  return r
}