// ababc
let state
function match(string) {
  console.log('start')
  state = start
  for (let c of string) {
    state = state(c)
  }
  console.log(state)
}
function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}
function foundA(c) {
  if (c === 'b') {
    return foundB
  }
  return start
}
function foundB(c) {
  if (c === 'a') {
    return foundA2
  }
  return start
}
function foundA2(c) {
  if (c === 'b') {
    return foundB2
  }
  return start
}
function foundB2(c) {
  if (c === 'c') {
    return end
  }
  return foundB(c)
}
function end(c) {
  console.log('match')
  return end
}
match('ababac')
function kmp(patten, string) {
  let kmpT = []
  let j = 0
  for (let i = 0; i < patten.length; i++) {
    if (i === 0) {
      kmpT.push(j)
    } else {
      if (patten[i] === patten[j]) {
        j += 1
      } else {
        j = 0
      }
      kmpT.push(j)
    }

  }
  j = 0
  //'ababc','abababc'
  for (let i = 0; i < string.length; i++) {
    // console.log(patten[j],string[i])
    if (patten[j] === string[i]) {
      if (j === patten.length - 1) {
        console.log('success')
      }
      j++
    } else {
      console.log(j,kmpT[j-1])
      j = kmpT[j-1] === 0 ? '0' : kmpT[j-1] - 1
      if(j!==0) {      i--}

      console.log(j)
    }

  }
  return kmpT
}
console.log(JSON.stringify(kmp('ababc', 'abababc')))
