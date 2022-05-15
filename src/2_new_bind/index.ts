declare global {
  interface Object {
    __proto__: Object
  }

}


function ObjectFactory(Constructor: Function, ...args: any[]) {

  const obj = new Object
  obj.__proto__ = Constructor.prototype

  const instance = Constructor.apply(obj, args)

  return typeof instance === 'object' && instance !== null ? instance : obj
}

function Bind(target: Object, ...args: any[]) {

  if(typeof this !== "function"){
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
  }

  const self = this
  const fNOP = function () {}
  const fBound = function (...rest: any[]) {
    // instanceof 判断为自己主要是作为构造函数时
    return self.apply(this instanceof fBound ? this : target, [...args, ...rest])
  }

  // 避免修改 this.prototype
  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()

  return fBound
}


export {
  ObjectFactory,
  Bind,
}