# 每周总结可以写在这里

## 编程语言通识

- 非形式语言

  - 中文，英文

- 形式语言（乔姆斯基谱系）

  > **乔姆斯基体系**是[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)中刻画[形式文法](https://zh.wikipedia.org/wiki/形式文法)表达能力的一个分类谱系，是由[诺姆·乔姆斯基](https://zh.wikipedia.org/wiki/诺姆·乔姆斯基)于1956年提出的
  >
  > | 文法 | 语言           | 自动机                 | 产生式规则           |
  > | ---- | -------------- | ---------------------- | -------------------- |
  > | 0-型 | 递归可枚举语言 | 图灵机                 | αAβ -> δ （无限制）  |
  > | 1-型 | 上下文相关语言 | 线性有界非确定性图灵机 | αAβ -> αγβ           |
  > | 2-型 | 上下文无关语言 | 非确定下推自动机       | A->α                 |
  > | 3-型 | 正则语言       | 有限状态自动机         | A -> aB   <br/>A-> a |
  >
  > - a = 终结符
  > - A,B = 非终结符
  > - α,β,γ,δ = 终结符和非终结符字符串（可以只有终结符或者非终结符）
  >   - α,β,δ 可能为空
  >   - γ 不可为空

  - 0型 无限制文法

  - 1型 上下文相关文法

    > 词的意思和上下文相关
    >
    > 对引擎实现者不友好

  - 2型上下文无关文法

    > 词的意思和上下文无关，大多数语言主体上的上下文无关文法，javascript不是上下无关文法，部分文法是上下文相关文法

  - 3型 正则文法

    > 能用正则解析的文法
    >
    > 限制表达能力

现在语言，所有的文法分为词法和语法

词法用正则分词，用词作为输入流

## 产生式(BNF)

- 用尖括号括起来的名称来表示语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的符合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- *表示重复多次
- |表示或
- +表示至少一次

```ruby
// "a"=terminal
// "b"=terminal
<Program>:= "a"+ | "b"+
<Program>:=<Program> "a"+ |<Program> "b"+
```

```ruby
/* 加法 */
<Number>= "0"|"1"|"2"......|"8"|"9"
<DecimalNumber>="0"|(("1"|"2"|"3"|.......|"9")<Number>*)
<Expression> = <DecimalNumber> "+" <DecimalNumber>
<Expression> = <Expression> "+" <DecimalNumber>
// a也表示加法
<Expression> = <DecimalNumber>|<Expression> "+" <DecimalNumber>
```

```ruby
/*四则运算*/
<AddExpr> = <DecimalNumber> | <AddExpr> "+" <DecimalNumber>
<MulExpr> = <DecimalNumber> | 
			<DecimalNumber> "*" <MulExpr> |
			<DecimalNumber> "/" <MulExpr>

<AddExpr> = <MulExpr> | 
			<AddExpr> "+" <MulExpr> | 
			<AddExpr> "-" <MulExpr>
<LogicalExpr> = <AddExpr> | 
				<LogicalExpr> "&&" <AddExpr> |
				<LogicalExpr> "||" <AddExpr>
<PrimaryExpr> = <DecimalNumber> | "(" <LogicalExpr> ")"
```

```javascript
// 正则表示
<DecimalNumber> = /0|[1-9][0-9]*/
<AddExpr> = /^(0|[1-9][0-9]*)([\+\-](0|[1-9][0-9]*))*$/
<MulExpr> = /^(0|[1-9][0-9]*)([\*\/](0|[1-9][0-9]*))*$/
<AddExpr> = /(^[\+\-](0|[1-9][0-9]*)([\*\/](0|[1-9][0-9]*))*)/
// 带括号的加法法
<AddExpr> = <MulExpr> | 
			<AddExpr> "+" <MulExpr> | 
			<AddExpr> "-" <MulExpr> |
```

### 现代语言特例

- c++  *可能表示乘法或者指针
- vb  < 可能表示小于也可能XML
- python 行首tab 符和空格根据上一行行首空白规则被处理为indent 或者 dedent
- javascript 中， / 可能为正则也可能为除号

### 图灵完备性

- 图灵完备性
  - 命令式——图灵机
    - goto
    - if 和 while
  - 声明式——lambda
    - 递归

### 动态与静态

- 动态：
  - 在用户设备/在线服务器上
  - 产品实际运行时
  - Runtime
- 静态(减少bug)
  - 在程序员的设备上
  - 产品开发时
  - Compiletime

#### 类型系统

- 动态类型系统

- 静态类型系统

- 强类型

- 弱类型

  - 有隐性转换（c++,ts,js）

- 符合类型

  - 结构体

  - 函数签名

    ```javascript
    // 位置类型需要一一对应
    (T1,T2) => T3
    ```

    

- 子类型

  - 逆变/协变

    ```typescript
    // 协变：凡是能用Array<Parent>的地方，都能用到Array<Chile>
    // 逆变：凡是能用Function<Child> 的地方，都能用Function<Parent>
    // typescript 可以看作在javascript 上加入静态类型系统
    ```

    

## 一般命令式编程

- Program
  - Program
  - Module
  - Package
  - Library
- Structure
  - Function
  - Class
  - Process
  - Namespace
- Statement
  - Expression
    - Atom
      - Identifier
      - Literal
    - Operator
    - Punctuator(符号)
  - Keyword
  - Punctuator

## 语义

```
SourceCharacter::
	any Unicode code poin
```

### Unicode

unicode 是一个字符集，规定了一系列字符

字符对应码点，码点为正整数

a 的码点  97

A 的码点 65

现在存在的字符基本都兼容Ascii 字符集

```javascript
for(let i=0;i<128;i++) {
    console.log(String.fromCharCode(i))
    document.write(`<span>${String.fromCharCode(i)}</span><br/>`)
}
var 厉害 = 1;
console.log(厉害);
var \u5389\u5bb3 = 2
```

| Character                                                    | Name                      |
| :----------------------------------------------------------- | :------------------------ |
| [U+0020](http://www.fileformat.info/info/unicode/char/0020/index.htm) | SPACE                     |
| [U+00A0](http://www.fileformat.info/info/unicode/char/00a0/index.htm) | NO-BREAK SPACE            |
| [U+1680](http://www.fileformat.info/info/unicode/char/1680/index.htm) | OGHAM SPACE MARK          |
| [U+2000](http://www.fileformat.info/info/unicode/char/2000/index.htm) | EN QUAD                   |
| [U+2001](http://www.fileformat.info/info/unicode/char/2001/index.htm) | EM QUAD                   |
| [U+2002](http://www.fileformat.info/info/unicode/char/2002/index.htm) | EN SPACE                  |
| [U+2003](http://www.fileformat.info/info/unicode/char/2003/index.htm) | EM SPACE                  |
| [U+2004](http://www.fileformat.info/info/unicode/char/2004/index.htm) | THREE-PER-EM SPACE        |
| [U+2005](http://www.fileformat.info/info/unicode/char/2005/index.htm) | FOUR-PER-EM SPACE         |
| [U+2006](http://www.fileformat.info/info/unicode/char/2006/index.htm) | SIX-PER-EM SPACE          |
| [U+2007](http://www.fileformat.info/info/unicode/char/2007/index.htm) | FIGURE SPACE              |
| [U+2008](http://www.fileformat.info/info/unicode/char/2008/index.htm) | PUNCTUATION SPACE         |
| [U+2009](http://www.fileformat.info/info/unicode/char/2009/index.htm) | THIN SPACE                |
| [U+200A](http://www.fileformat.info/info/unicode/char/200a/index.htm) | HAIR SPACE                |
| [U+202F](http://www.fileformat.info/info/unicode/char/202f/index.htm) | NARROW NO-BREAK SPACE     |
| [U+205F](http://www.fileformat.info/info/unicode/char/205f/index.htm) | MEDIUM MATHEMATICAL SPACE |
| [U+3000](http://www.fileformat.info/info/unicode/char/3000/index.htm) | IDEOGRAPHIC SPACE         |

### InputElement

- InputElement
  - WhiteSpace // 空白
    - <TAB>
    - <VT> 纵向制表符
    - <FF>
    - <SP>
    - <NBSP> 用于不断词的
    - <ZWNBSP>
    - <USP>
  - LineTerminator // 换行
  - Comment // 注释
  - Token // 词

/ufeff BOM <ZWNBSP> zero width no break space

