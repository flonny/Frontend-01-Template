class Component {
  constructor(type) {
    this.root = document.createElement(type)
    this.attributes = new Map()
    this.children = new Set()
  }
  appendChild(child) {
    this.children.add(child)
  }
  setAttribute(prop, value) {
    this.attributes.add([prop, value])
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }

}
class Panel extends Component {
  constructor() {
    super()
    this.root = document.createElement('div')
  }
  render() {
    return <div>
      <h1>42342

      asdfas
      </h1>
      <div>
        34234234
      </div>
    </div>
  }
}
function isLetter(c) {
  const index = c.charCodeAt(0)
  return (index >= 97 && index <= 122) || (index >= 65 && index <= 90)
}
function typeToString(data) {
  let type = Object.prototype.toString.call(data)
  let stringType = ''
  const waitSpace = 'WAIT_SPACE'
  const waitChar = 'WAIT_Char'
  let state = waitSpace
  for (let c of type) {
    if (state === waitSpace && c === ' ') {
      state = waitChar
    } else if (state === waitChar && isLetter(c)) {
      stringType += c
    }
  }
  return stringType.toLowerCase()
}

function create(type, attributes, ...children) {
  let component
  if (typeof type === 'string') {
    component = new Component(type)
  } else {
    component = new type
  }
  if(typeToString(children) === 'array') {
  console.log(children)
  }
  return component
}
function render(component, root) {
  // console.log(component.render())
  component.mountTo(root)
}
let panel = <Panel>
  <div></div>
  <p></p>
</Panel>
render(
  panel,
  document.getElementById('root')
);
console.log(typeToString(1231))