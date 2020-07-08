let useReactivities = []
let handlers = new Map()
let reactiveDep = new Map()
function reactive(obj) {
  if (reactiveDep.get(obj)) {
    return reactiveDep.get(obj)
  }
  let proxy = new Proxy(obj, {
    get: function (obj, prop) {
      useReactivities.push([obj, prop])
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop])
      }
      return prop in obj ? obj[prop] : void 0;
    },
    set: function (obj, prop, newVal) {
      obj[prop] = newVal
      if (handlers.has(obj) && handlers.get(obj).has(prop)) {
        for (let handler of handlers.get(obj).get(prop)) {
          handler()
        }
      }
      return newVal
    },
    has: function (obj, prop) {
      if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        useReactivities.push([obj, prop])
      }
      return prop in obj;
    },
    deleteProperty: function (obj, prop) {
      if (handlers.get(obj) && handlers.get(obj).has(prop)) {
        for (let handler of handlers.get(obj).get(prop)) {
          if (prop in obj) {
            delete obj[prop]
          }
          handler()
        }
      }
      return true;
    },
  })
  reactiveDep.set(obj, proxy)
  return proxy
}
function effect(handler) {
  handler()
  for (let useReactivity of useReactivities) {
    const [obj, prop] = useReactivity
    if (!handlers.has(obj)) {
      handlers.set(obj, new Map())
    }
    if (!handlers.get(obj).has(prop)) {
      handlers.get(obj).set(prop, [])
    }
    handlers.get(obj).get(prop).push(handler)
  }
}


let dummy
const counter = reactive({ num: 0 })
const parentCounter = reactive({ num: 2 })
Object.setPrototypeOf(counter, parentCounter)
effect(() => (dummy = counter.num))
console.log(dummy)
delete counter.num
console.log(dummy)
parentCounter.num = 4
console.log(dummy)