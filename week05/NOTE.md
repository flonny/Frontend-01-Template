- js Context => Realm
- 宏任务
- 微任务
- 函数调用（Execution Context）
- 语句/声明
- 表达式
- 直接量/变量/this



- execution context
  - code evaluation state
  - Function
  - Script or Module
  - Generator
- ECMAScript Code Execution Context
  - code evolution state
  - Function
  - Script or Module
  - Realm
  - LexicalEnvironment
  - VariableEnvironment
- LexicalEnvironment
  - this
  - new.target
  - super
  - 变量
- VariableEnvironment
  - 主要用作处理var 
  - eval
  - with
- Environment Records
  - Declarative Environment Records
    - Function
    - module
  - Global Environment Records
  - Object Environment Records

Function- Glosure

```javascript
var y = 2;
function foo2() {
  console.log(y)
}
export foo2
```



// 箭头函数会在Environment Record 中产生this



Realm 的定义

Before it is evaluated, all ECMAScript code must be associated with a realm. Conceptually, a realm consists of a set of intrinsic objects, an ECMAScript global environment, all of the ECMAScript code that is loaded within the scope of that global environment, and other associated state and resources. 

```javascript
Object.getPrototypeOf({}) === Object.prototype
```

函数表达式和对象之间量均会创建对象

使用 . 做隐式转换也会创建对象

这些对象也有原型，如果没有Realm，就不知道他们的原型

```javascript
var iframe = document.createElement("iframe")
document.body.appendChild(iframe)
iframe.contentWindow.eval("this.o ={}")
var o = iframe.contentWindow.o
var b = {}
Object.getPrototypeOf(o) === Object.prototype // false
Object.getPrototypeOf(b) === Object.prototype // true
```

