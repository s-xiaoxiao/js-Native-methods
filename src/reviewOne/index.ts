/**
 * 
 * @param thisArg 
 * @param args 
 * @returns 
 */
function Call(thisArg, ...args) {
  // 设置上下文this
  const context = thisArg || window;

  context.fn = this;

  // 拿到返回值
  const got = context.fn(...args);

  delete context.fn;

  return got;
}


/**
 * apply
 */
function Apply(thisArg, args) {
  const context = thisArg || window;
  context.fn = this;

  let result = !args.length
    ? context.fn()
    : context.fn(...args);

  delete thisArg.fn
  return result
}

/**
 * bind
 */
function Bind(thisArg, args) {

  if (typeof this !== "function") {
    new Error("Function.prototype.bind - what is trying to be bound is not callable")
  }
  const self = this

  const fNOP = function () { }
  const fBound = function (...rest) {
    return self.apply(this instanceof fBound ? this : thisArg, [...args, ...rest])
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()

  return fBound
}
/**
 * new
 */

function ObjectFactory(Constructor, args) {
  const obj = new Object
  obj.__proto__ = Constructor.prototype

  const instance = Constructor.apply(obj, args)

  return typeof instance === "object" && instance !== null
    ? instance
    : obj
}
/**
 * currying
 */

function Curry(fn, ...args) {

  if (fn.length < args.length) {
    return Curry.bind(null, fn, ...args)
  }

  fn(...args)
}



