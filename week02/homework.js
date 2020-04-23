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
const DecimalLiteral = /^(0$|0?\.|[1-9][0-9]*\.?)[0-9]*([eE][\+\-]?[0-9][0-9]*)?$/