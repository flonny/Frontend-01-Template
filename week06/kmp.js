function getPatteMap (patten) {
  const pattenMap = new Map()
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
  return pattenMap
}
/**
 *
 * 
 *
 1 2 3 4 5 6 7
 a a a c d a d
 0 1 2 0 0 1 0
 
 ababa aaacdad babab
 * @returns
 */
function kmp(patten, string) {
  const  pattenMap = getPatteMap(patten)
  let j = 0;
  let i = 0;

  while ( i < string.length) {
    //  当j+1 和 i匹配 j&i 向左移动一位
    if (pattenMap.get(j + 1).value === string[i]) {
      j += 1
      i++
    } else if (j === 0) {
      // 如果不匹配，j===0 i++
      i++
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
console.log(JSON.stringify(kmp('ababc', 'abababc'))) // success
console.log(JSON.stringify(kmp('ababc', 'abababababab'))) // faild
console.log(JSON.stringify(kmp('abab', 'abababababab'))) //success
console.log(JSON.stringify(kmp('aaacdad', 'ababaaacdadbabab'))) //success