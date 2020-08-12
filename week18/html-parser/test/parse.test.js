import {parseHTML} from "../src/parse";
import assert from "assert";

  it("parse", () => {
    const stack = parseHTML("<div></div>");
    const div = stack.children[0];
    assert.equal(div.tagName, "div");
    assert.equal(div.type, "element");
    assert.equal(div.children.length, 0);
    assert.equal(div.attributes.length, 0);
  });
  it("parse tset", () => {
    const stack = parseHTML("<div>text</div>");
    const div = stack.children[0];
    assert.equal(div.children.length, 1);
    assert.equal(div.children[0].type, 'text');
    assert.equal(div.children[0].content, 'text');

  });
  it("This is an unexpected-solidus-in-tag ", () => {
    try{
    const stack = parseHTML("<a>test</a>");
    } catch(e) {
     assert.equal(e.message,"Tag start end don't match")
    }
  });
  it("tag sigle quo attr", () => {
    const stack = parseHTML("<div id='12'>test</div>");
    const div = stack.children[0];
    assert.equal(div.children.length, 1);
    assert.equal(div.attributes.length, 1);
    assert.equal(div.attributes[0].name, 'id');
    assert.equal(div.attributes[0].value, '12');
  });
  it("tag double quo attr", () => {
    const stack = parseHTML(`<div id="12">test</div>`);
    const div = stack.children[0];
    assert.equal(div.children.length, 1);
    assert.equal(div.attributes.length, 1);
    assert.equal(div.attributes[0].name, 'id');
    assert.equal(div.attributes[0].value, '12');
  });
  it("tag no quo attr", () => {
    const stack = parseHTML(`<div data-type=123>test</div>`);
    const div = stack.children[0];
    assert.equal(div.children.length, 1);
    assert.equal(div.attributes.length, 1);
    assert.equal(div.attributes[0].name, 'data-type');
    assert.equal(div.attributes[0].value, '123');
  });
  it("selfClosingStartTag", () => {
    const stack = parseHTML(`<img />`);
    const img = stack.children[0];
    assert.equal(img.tagName, "img");
    assert.equal(img.type, "element");
    assert.equal(img.isSlefClosing, true);
  });
  it("selfClosingStartTag error", () => {
    try{
    const stack = parseHTML(`<img /a>`);
    }catch(e) {
      assert.equal(e.message, 'This is an unexpected-solidus-in-tag'); 
    }
  });
  it("afterAttributeName", () => {
    const stack = parseHTML(`<div id ="12" ></div>`);
    const div = stack.children[0];
    assert.equal(div.attributes[0].name, 'id');
    assert.equal(div.attributes[0].value, '12');
  });
  it("script", () => {
    const stack = parseHTML(`<script></script>`);
    const script = stack.children[0];
    assert.equal(script.tagName, "script");
    assert.equal(script.type, "element");
  });
  it("script content", () => {
    const stack = parseHTML(`<script>var a = '</script';a='<';a='</';a='</s';a='</sc';a='</scr';a='</scri';a='</scrip';a='</scripd'</script>`);
    const script = stack.children[0];
    assert.equal(script.tagName, "script");
    assert.equal(script.type, "element");
    assert.equal(script.children.length, 1);
    assert.equal(script.children[0].type, 'text');
    assert.equal(script.children[0].content, `var a = '</script';a='<';a='</';a='</s';a='</sc';a='</scr';a='</scri';a='</scrip';a='</scripd'`);
  });
  it("no name tag", () => {
    const stack = parseHTML(`<></>`);
    const noNameTag = stack.children[0];
    assert.equal(div.tagName, "");
    assert.equal(div.type, "element");
    assert.equal(div.children.length, 0);
    assert.equal(div.attributes.length, 0);
  });
