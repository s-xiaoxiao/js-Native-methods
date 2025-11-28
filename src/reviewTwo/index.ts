/**
 * sum function
 */

function Sum(...arg: number[]) {

  const numbers: number[] = [];

  function calculate(...arg: number[]) {
    numbers.push(...arg)
    return calculate
  }

  calculate.valueOf = function (): number {
    return this.numbers.reduce((total: number, number: number) => total + number)
  }

  return calculate(...arg);
}

/**
 * 偏函数
 */
function Partial(fn, ...args) {
  return (...rest) => fn(...args, ...rest)
}
/**
 * this 输出问题
 */

// 已复习！

/**
 * instanceof
 */

function InstanceOf({ __proto__ }, { prototype }) {

  while (true) {

    if (!__proto__) return false;

    if (__proto__ === prototype) return true

    __proto__ = prototype.__proto__
  }

}
/**
 * create
 */

function Create(proto, propertiesObject) {

  if (!["object", "function"].includes(typeof proto)) {
    throw new TypeError("大兄弟，第一个参数传错了，仔细瞧瞧")
  }

  function Target() { }
  Target.prototype = proto

  const target = new Target()

  if (propertiesObject) Object.defineProperties(target, propertiesObject)

  if (proto === null) target.__proto__ = null

  return target
}