let ObjToProxy = new Map();
let handlers = [];
let keyType;
function reactive(obj) {
  if (ObjToProxy.has(obj)) {
    return ObjToProxy.get(obj);
  }
  let proxy = new Proxy(obj, {
    get(obj, prop) {
      console.log(prop)
      keyType = typeof prop;
      if (typeof obj[prop] === "object") {
        return reactive(obj[prop]);
      }
      return Reflect.get(...arguments);
    },
    has(obj, prop) {
      return Reflect.has(...arguments);
    },
    ownKeys(obj, prop) {
      return Reflect.ownKeys(...arguments);
    },
    set(obj, prop) {
      Reflect.set(...arguments);
      for (let handler of handlers) {
        handler();
      }
      return obj[prop];
    },
    deleteProperty(obj, prop) {
      Reflect.deleteProperty(obj, prop);
      for (let handler of handlers) {
        handler();
      }
      return true;
    },
  });
  ObjToProxy.set(obj, proxy);
  return ObjToProxy.get(obj);
}
function effect(handler) {
  handler();
  if (keyType !== "symbol") {
    handlers.push(handler);
  }
}

const key = Symbol.isConcatSpreadable;
let dummy;
const array = reactive([]);
effect(() => (dummy = array[key]));
console.log(array[key]);
console.log(dummy);
console.log((array[key] = 1));
console.log(dummy);
