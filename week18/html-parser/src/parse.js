const EOF = Symbol("EOF");
const EOFToken = {
  type: "EOF",
};
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack;
function isASCIIAlpha(c) {
  return c.match(/^[a-zA-Z]$/);
}
function isSpace(c) {
  return c.match(/^[\t\n\f ]$/);
}
function emit(token) {
  let top = stack[stack.length - 1];
  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: [],
    };
    element.tagName = token.tagName;
    for (let p in token) {
      if(p === 'isSlefClosing') {
        element.isSlefClosing = true
      }else if (p !== "type" && p !== "tagName") {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }
    top.children.push(element);
    element.parent = top;
    if (!token.isSlefClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === "endTag") {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end don't match");
    } else {
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
  // if (token.type !== "text") {
  //   console.log(token);
  // }
}
function data(c) {
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    emit(EOFToken);
    return;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}
function tagOpen(c) {

  if (c === "/") {
    return endTagOpen;
  } else if (isASCIIAlpha(c)) {
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    return tagName(c);
  } else if (c === ">") {
    emit(currentToken);
    return data;
  }
}
function endTagOpen(c) {
  if (isASCIIAlpha(c)) {
    currentToken = {
      type: "endTag",
      tagName: "",
    };
    return tagName(c);
  }
  return endTagOpen;
}
function tagName(c) {
  if (isSpace(c)) {
    return beforeAttributeName;
  } else if (isASCIIAlpha(c)) {
    currentToken.tagName += c;
    return tagName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    return emit(EOFToken);
  }
}
function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSlefClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    return emit(EOFToken);
  } else {
    throw new Error("This is an unexpected-solidus-in-tag");
  }
}
function beforeAttributeName(c) {
  if (isSpace(c)) {
    return beforeAttributeName;
  } else if (c === "=") {
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c);
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (isSpace(c) || c === "/" || c === ">" || c === "EOF") {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<") {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}
//After attribute name state
function afterAttributeName(c) {
  if (isSpace(c)) {
    return afterAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    emit(EOFToken);
  } else {
    currentAttribute = {};
  }
}
function beforeAttributeValue(c) {
  if (isSpace(c) || c === "/" || c === ">" || c === "EOF") {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    return singleQuotedAttributeValue;
  } else if (c === ">") {
  } else {
    return unquotedAttributeValue(c);
  }
}
//Switch to the attribute value (double-quoted) state.
function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuetedAttributeValue;
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}
//Switch to the attribute value (single-quoted) state.
function singleQuotedAttributeValue(c) {
  if (c === "'") {
    return afterQuetedAttributeValue;
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}
//Reconsume in the attribute value (unquoted) state.
function unquotedAttributeValue(c) {
  if (isSpace(c)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentAttribute);
    return data;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<" || c === "=" || c === "`") {
    currentAttribute.value += c;
    return unquotedAttributeValue;
    throw new Error("unexpected-character-in-unquoted-attribute-value");
  } else if (c === EOF) {
    emit(EOFToken);
  } else {
    currentAttribute.value += c;
    return unquotedAttributeValue;
  }
}
function afterQuetedAttributeValue(c) {
  if (isSpace(c)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === "EOF") {
    emit(EOFToken);
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;//This is a missing-whitespace-between-attributes parse error.
    return beforeAttributeName(c);
  }
}
function scriptData(c) {
  if (c === "<") {
    return scriptDataLessThanSign
  } else {
    emit({
      type: "text",
      content: c,
    });
    return scriptData
  }
}
// </script> </
function scriptDataLessThanSign(c) {
  if (c === "/") {
    return scriptDataEndTagOpen
  } else {
    emit({
      type: "text",
      content: '<'+c,
    });
    return scriptData
  }
}
//</script> </
function scriptDataEndTagOpen(c) {
  if (c === "s") {
    return scriptDataEndTagNameS
  } else {
    emit({
      type: "text",
      content: '</'+c,
    });
    return scriptData
  }
}
//</script>t </s
function scriptDataEndTagNameS(c) {
  if (c === "c") {
    return scriptDataEndTagNameC
  } else {
    emit({
      type: "text",
      content: '</s'+c,
    });
    return scriptData
  }
}
//</script>t </sc
function scriptDataEndTagNameC(c) {
  if (c === "r") {
    return scriptDataEndTagNameR
  } else {
    emit({
      type: "text",
      content: '</sc'+c,
    });
    return scriptData
  }
}
//</script>t </s
function scriptDataEndTagNameR(c) {
  if (c === "i") {
    return scriptDataEndTagNameI
  } else {
    emit({
      type: "text",
      content: '</scr'+c,
    });
    return scriptData
  }
}
//</script>t </s
function scriptDataEndTagNameI(c) { 
  if (c === "p") {
    return scriptDataEndTagNameP
  } else {
    emit({
      type: "text",
      content: '</scri'+c,
    });
    return scriptData
  }
}

//</script>t </s
function scriptDataEndTagNameP(c) {
  if (c === "t") {
    return scriptDataEndTag
  } else {
    emit({
      type: "text",
      content: '</scrip'+c,
    });
    return scriptData
  }
}


function scriptDataEndTag(c){
  if(c == " ") {
      return scriptDataEndTag;
  } if(c == ">") {
      emit({
          type: "endTag",
          tagName : "script"
      });
      return data;
  } else {
      emit({
          type:"text",
          content:"</script"+c
      });
      return scriptData;
  }
}
export  function parseHTML(html){
  stack = [
    {
      type: "document",
      children: [],
    },
  ];
    let state = data;
    for(let c of html) {
        state = state(c);
        if(stack[stack.length - 1].tagName === "script" && state == data) {
            state = scriptData;
        }
    }
    state = state(EOF);
    console.log('\n\n------ begin: .div ------')
    console.log(stack[0])
    console.log('------ end: .div ------\n\n')
    return stack[0];
}

// const teststack = parseHTML('<div>test</div>')
// const div = teststack.children[0]
// console.log(teststack)
// console.log(div.children.length)

// console.log('end')
