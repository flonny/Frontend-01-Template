function create(Cls, attributes, ...children) {
    let o
    if (typeof Cls === 'string') {
        o = new Wraper(Cls)
    } else {
        o = new Cls
    }

    for (let name in attributes) {
        o.setAttribute(name, attributes[name])
    }
    for (let child of children) {
        o.appendChild(child)
    }
    return o
}
class Wraper {
    constructor(type) {
        this.children = []
        this.root = document.createElement(type)
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        this.children.push(child)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
        for (let child of this.children) {
            if (typeof child === 'string') {
                new Text(child).mountTo(this.root)
            } else {
                child.mountTo(this.root)
            }

        }
    }
}
class Text {
    constructor(text) {
        this.root = document.createTextNode(text)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
    }
}
class Component {
    constructor() {
        this.children = []
        this.root = document.createElement('div')
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }
    appendChild(child) {
        this.children.push(child)
    }
    mountTo(parent) {
        parent.appendChild(this.root)
        for (let child of this.children) {
            child.mountTo(this.root)
        }
    }
}
class Artical extends Component {
    render() {

        return <artical>
            <header>header</header>
            {this.root}
            <footer>footer</footer>
        </artical>

    }
    mountTo(parent) {
        this.root = <div></div>
        for (let child of this.children) {
          this.root.appendChild(child)
        }
        this.render().mountTo(parent)
  
    }
}
class Parent extends Component {


}
class Child extends Component {

}
// let component =
//     <Parent id="a" class="a">
//         <Child/>
//         <p/>
//         <Child />
//         <Child />
//     </Parent>
let component = <Artical><div>123123</div></Artical>
component.mountTo(document.getElementById('root'))