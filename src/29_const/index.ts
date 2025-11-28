function Const(name, value) {
  Object.defineProperty(window, name, {
    get() {
      return value
    },
    set() {
      throw new Error('Cannot reassign constant')
    }
  });
}

Const('test', "test")
console.log(test) // test

test = "aa" // Error Cannot reassign constant 