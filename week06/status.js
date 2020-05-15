// // ababc
// let state
// function match(string) {
//   console.log('start')
//   state = start
//   for (let c of string) {
//     state = state(c)
//   }
//   console.log(state)
// }
// function start(c) {
//   if (c === 'a') {
//     return foundA
//   } else {
//     return start
//   }
// }
// function foundA(c) {
//   if (c === 'b') {
//     return foundB
//   }
//   return start
// }
// function foundB(c) {
//   if (c === 'a') {
//     return foundA2
//   }
//   return start
// }
// function foundA2(c) {
//   if (c === 'b') {
//     return foundB2
//   }
//   return start
// }
// function foundB2(c) {
//   if (c === 'c') {
//     return end
//   }
//   return foundB(c)
// }
// function end(c) {
//   console.log('match')
//   return end
// }
// match('ababac')
/*
 1 2 3 4 5 6 7 8 9 10
 a a b c a d a a b e
 0 1 0 0 1 0 1 2 3 0
*/
function kmp(patten, string) {
  let pattenMap = new Map()
  let k = 0
  for (let i = 0; i < patten.length; i++) {
    if (i === 0) {
      pattenMap.set(i + 1, { value: patten[i], index: k })
    } else {
      if (patten[i] === patten[k]) {
        k += 1

      } else {
        k = 0
      }
      pattenMap.set(i + 1, { value: patten[i], index: k })
    }

  }
  let j = 0;
  let i = 0;
  /* 'aaacdad', 
    'ababaaacdadbabab'
    */
  while ( i < string.length) {
  
    //  当j+1 和 i匹配 j&i 向左移动一位
    if (pattenMap.get(j + 1).value === string[i]) {
      j += 1
      i++
    } else if (j === 0) {
      // 如果不匹配，j===0 i++
      j++
    } else {
      // j !== 0; j=这个字母的index
      j = pattenMap.get(j).index
    }
    // 如果pattenMap中全部取完了那么中断for循环 返回success
    if (pattenMap.get(j+1) === void 0) {
      return 'success'
    }

  }
  // 循环结束没有匹配返回 faild
  return 'faild'
}
// console.log(JSON.stringify(kmp('ababc', 'abababc')))
// console.log(JSON.stringify(kmp('ababc', 'abababababab')))
// console.log(JSON.stringify(kmp('abab', 'abababababab')))
console.log(JSON.stringify(kmp('aaacdad', 'ababaaacdadbabab')))
