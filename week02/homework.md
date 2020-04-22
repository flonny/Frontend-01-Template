# 写一个正则表达式 匹配所有 Number 直接量

```javascript
// DecimalDigit
const DecimalDigit = /^[0-9]$/
//DecimalDigits
const DecimalDigits = /^[0-9][0-9]*$/
// DecimalIntegerLiteral
const DecimalIntegerLiteral = /^0$|^[1-9][0-9]*$/
// ExponentPart
const ExponentPart = /^[eE][\+\-]?[0-9][0-9]*$/
//. DecimalDigits ExponentPartopt
const DecimalLiteralFirst = /^\.[0-9][0-9]*([eE][\+\-]?[0-9][0-9]*)?$/ 
//DecimalIntegerLiteral . DecimalDigitsopt ExponentPartopt 
const DecimalLiteralSecond = /^0|^[1-9][0-9]*\.[0-9]*([eE][\+\-]?[0-9][0-9]*)?$/
// DecimalIntegerLiteral ExponentPartopt
const DecimalLiteralThird = /^0|^[1-9][0-9]*([eE][\+\-]?[0-9][0-9]*)?$/
const DecimalLiteral = /^(0$|0?\.|[1-9][0-9]*\.?)[0-9]*([eE][\+\-]?[0-9][0-9]*)?$/
```



# 一个 UTF-8 Encoding 的函数

```javascript
function UTF8_Encoding(string) {
  const textEncoder = new TextEncoder();
  let encoded = textEncoder.encode(string);
  let encodeValue = "";
  encoded.forEach((Codepoint) => {
    encodeValue += `\\x${Codepoint.toString(16)}`;
  });
  return encodeValue
}
console.log(UTF8_Encoding("Foo © bar 𝌆 baz ☃ qux"));
```



# 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

```javascript
// 空字符串
const noneString = /^""$/
/* DoubleStringCharacter 
SourceCharacter but not one of " or \ or LineTerminator
U+000A U+000D U+2028 U+2029
*/
let  DoubleStringCharacter = /[^"\\\u000a\u000D\u2028\u2029]+/
/*
<LS> U+2028
<PS> u+2029
*/


```

```
Code Point
U+000A U+000D U+2028 U+2029
Unicode Name Abbreviation
LINE FEED (LF) <LF> CARRIAGE RETURN (CR) <CR> LINE SEPARATOR <LS> PARAGRAPH SEPARATOR <PS>
```

