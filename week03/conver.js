export function converStringToNumber(string, x = 10) {
  const charStr = "0123456789abcdef";
  var chars = string.split("");
  let number = 0;
  let i = 0;
  while (i < chars.length && chars[i] != "." && chars[i] !== "e") {
    number = number * x;
    number += charStr.indexOf(chars[i]);
    i++;
  }
  if (chars[i] === "e") {
    let j = 0;
    i++;
    while (i < chars.length) {
      j = j * x;
      j += charStr.indexOf(chars[i]);
      i++;
    }
    while (j > 0) {
      number *= 10;
      j--;
    }
  }
  if (chars[i] === "."&& chars[i] !== "e") {
    i++;
    let fraction = 1;
    let dividend = x;
    while (i < chars.length) {
      number += charStr.indexOf(chars[i]) * (fraction / dividend);
      dividend = x * dividend;
      i++;
    }
  }
  if (chars[i] === "e") {
    let j = 0;
    i++;
    while (i < chars.length) {
      j = j * x;
      j += charStr.indexOf(chars[i]);
      i++;
    }
    while (j > 0) {
      number *= 10;
      j--;
    }
  }
  return number;
}
export function converNumberToString(number, x = 10) {
  var integer = Math.floor(number);
  var fraction = number % 1;
  let string = "";
  while (integer > 0) {
    string = (integer % x) + string;
    integer = Math.floor(integer / x);
  }
  if (fraction > 0) {
    string += ".";
  }
  while (fraction !== Math.floor(fraction)) {
    // debugger;
    fraction = fraction * x;
    string += Math.floor(fraction % 10) + "";
  }
  return string;
}
