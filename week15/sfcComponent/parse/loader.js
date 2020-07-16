
var loaderUtils = require('loader-utils')
var {parseHTML} = require('./parse')
module.exports = function (source) {
  let tree = parseHTML(source)
console.log('\n\n------ begin:  ------')
console.log(tree.children[0].children[1])
console.log('------ end:  ------\n\n')
  var options = loaderUtils.getOptions(this)
return 'adfafd'
}