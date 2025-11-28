declare global {
  interface Array<T> {
    Reduce: (callback: (accumulator: T, currentValue: T) => T, initialValue?: T) => T
  }
}


Array.prototype.Reduce = Reduce


/**
 * 
 * @param callback - 每个元素调用的函数
 * @param initialValue - 初始值
 * @returns - reduced value
 */
function Reduce(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new Error("callback must be a function")
  }

  let array = this

  if (array.length === 0 && initialValue === undefined) {
    throw new TypeError("Reduce of empty array with no initial value")
  }

  let accumulator = initialValue === undefined ? array[0] : initialValue

  for (let i = initialValue === undefined ? 1 : 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array)
  }

  return accumulator
}


