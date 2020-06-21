# week 10
## dom api
 - 元素的倒叙
 > addEventListener
 >
 > 参数
 >
 > - type
 >   - 监听的事件类型
 > - listenner
 >   - 事件触发后接收通知的对象
 >     - 可以是对象（EventListener接口）
 >       - [`EventListener.handleEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent)
 >     - 可以是函数
 > - options
 >   - captutre
 >   - once
 >   - passive
 > - useCapture
 >   - true
 >     - 捕获（从外向内）
 >   - false(默认)
 >     - 冒泡（从内向外）
 >   - 先触
 >   - 发捕获后冒泡

## range

- var range = new Range()