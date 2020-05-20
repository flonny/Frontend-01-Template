# 作业
  1. 状态机 abababx
    > ababbax.js
  2. 未知的patten match string
    > state.js
  3. 浏览器
    > browser[未完成]
# 每周总结可以写在这里

## 概念

### 有限状态机

- 每一个状态都是机器，这些机器都是独立的
- 每一个状态都是一个机器
- 在每一个状态机中可以做计算存储、输出
- 所有的状态机输入一致的
- 状态机本身没有状态，可以用纯函数类比
- 每个机器知道下一个状态
  - 每个机器都有确定的下个状态
  - 每个机器根据输入决定下个状态

#### 在一个字符串中找到字符“a”

```javascript
function findCharA(string) {
  const whaitfindchar = 1
  const findchar = 2
  let length = string.length
  let charindex=""
  while(length--) {
    if(this.status ===whaitfindchar) {
      if(string[length] === 'a'){
        this.status = findchar
      }
    }
    if(this.status===findchar) {
      charindex=length
      break;
    }
  }
  return charindex
}
```

- 作业
  - 1. abcabx
    2. abababx
    3. 状态机处理完全未知的pattern
       1. match(pattern, string)
       2. 参考 kmp string
       3. 提示状态可生成
       4. 闭包
       5. AST、LR、LF