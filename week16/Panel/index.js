class Panel {
  constructor() {
    this.root = document.createElement('div')
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
  render() {
    return <div>
      <h1>{this.title}</h1>
      <div>
        {this.children}
      </div>
    </div>
  }
}
function create(type, attributes, children) {
  let element
  if (typeof type === 'function') {
    element = new type
    if (attributes) {
      for (let prop in attributes) {
        element.setAttribute(prop, attributes[prop])
      }
    }

    if (children) {
      for (let child of children) {
        element.appendChild(child)
      }
    }

  }
  return element
}
function render(component,root) {
  console.log(component)
  component.mountTo(root)
}
let panel = <Panel>

</Panel>
render(
  panel,
  document.getElementById('root')
);