function CurryHelper(fn: Function, ...args: any[]) {
  // 返回一个 包裹执行函数的函数；等待参数满后被调用
  return function (...innerArgs: any[]) {
    // 执行被柯里化的函数
    return fn.apply(this, [...args, ...innerArgs]);
  }
}

function Curry(fn: Function, length?: number) {
  length = length || fn.length

  return function (...args: any[]) {
    if (args.length < length) {
      // 收集 function 和 参数
      const combined = [fn, ...args]
      // 收集 剩余参数长度
      const residueLen = length - args.length
      // 收集 待执行的函数
      const CurryHelperReturn = CurryHelper.apply(this, combined)

      // 参数未满,继续被调用。
      return Curry(CurryHelperReturn, residueLen)
    } else {

      // 参数已满，执行函数
      return fn.apply(this, args)
    }
  }
}

export {
  Curry
}