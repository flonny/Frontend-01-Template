# selector
## 简单选择器
 - *
 - div svg|a 标签选择器|命名空间
 - .cls  class选择器
 - #id id选择器
 - [attr=value] [attr~=value] [attr|=value]属性选择器
 - :hover 伪类选择器
 - ::before 伪元素选择器

## 选择器语法

可以通过简单选择器的组合形成复合选择器

> <simple selector><simple selector>
>
> 如果有*或者div 必须现在最前面

通过<sp> > ~ + || 将选择器组合在一起形成复杂选择器

## 选择器优先级

> Universal selector ([`*`](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)), combinators ([`+`](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator), [`>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator), [`~`](https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator), ['` `'](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator), [`||`](https://developer.mozilla.org/en-US/docs/Web/CSS/Column_combinator)) and negation pseudo-class ([`:not()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:not)) have no effect on specificity. (The selectors declared *inside* `:not()` do, however.)

#id div.a#id [0,2,1,1]

```javascript
S = 0*N^3 + 2*N^2 + 1*N^1 +1
```

div#a.b .c[id=x] [0,1,3,1]

```javascript
S = 0*N^3 + 1*N^2 + 3*N^1 +1
```

#a:not(#b) [0,2,0,0]

```javascript
S = 0*N^3 + 2*N^2 + 0*N^1 +0
```

*.a [0,0,1,0]

```javascript
S = 0*N^3 + 0*N^2 + 1*N^1 +0
```

div.a [0,0,1,1]

```javascript
S = 0*N^3 + 0*N^2 + 1*N^1 +1
```

## 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target