import { start } from "repl"
function start(c) {
  if(c ==="a") return foundA
  return start(c)
}
function foundA(c) {
  if(c ==="b")
    return foundB
  return start(c)
}
function foundB(c) {}
function foundC(c) {}
function end(c) {
  return end(c)
}
function match(string) {
  let()
}