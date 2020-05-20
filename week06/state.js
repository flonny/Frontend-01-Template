// function getPatteMap (patten) {
//   const pattenMap = new Map()
//   let k = 0
//   for (let i = 0; i < patten.length; i++) {
//     if (i === 0) {
//       pattenMap.set(i + 1, { value: patten[i], index: k })
//     } else {
//       if (patten[i] === patten[k]) {
//         k += 1
//       } else {
//         k = 0
//       }
//       pattenMap.set(i + 1, { value: patten[i], index: k })
//     }
//   }
//   return pattenMap
// }
// /**
//  *
//  * 
//  *
//  1 2 3 4 5 6 7
//  a a a c d a d
//  0 1 2 0 0 1 0
function makeState(patten) {
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
  let j = 0
  return function state(c) {
    if(c===pattenMap.get(j+1).value) {
      j+=1
      if (pattenMap.get(j+1) === void 0) {
        return 'success'
      }
      return state
    }else if(j!==0) {
      j=pattenMap.get(j).index
      return state(c)
    }
    else {
      return state
    }

  }
}
function match(patten,string) {
  let state = makeState(patten)
  for(let c of string) {
    state = state(c)
    if(typeof state ==='string') {
      return state
    }
  }
  return 'faild'
}
console.log(JSON.stringify(match('ababc', 'abababc'))) // success
console.log(JSON.stringify(match('ababc', 'abababababab'))) // faild
console.log(JSON.stringify(match('abab', 'abababababab'))) //success
console.log(JSON.stringify(match('aaacdad', 'ababaaacdadbabab'))) //success