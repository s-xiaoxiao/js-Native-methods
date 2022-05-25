const _Object = {
  /**
   * 
   * @description assign 方法将所有可枚举和自有属性从一个或多个源对象赋值到目标对象，返回修改后的对象
   * 
   * @param {target} 目标对象
   * @param {...sources} 源对象
   */
  assign(target, ...sources) {
    // 处理边界问题
    if ([undefined, null].includes(target)) {
      throw new Error("第一个参数，传错了阿阿阿")
    }

    // 包装类型 
    target = Object(target)
    
    for (const source of sources) {
      const keys = [...Object.keys(source), ...Object.getOwnPropertySymbols(source)]
      const length = keys.length
      let len = 0
      let flag = false
      let key

      while (length > len) {
        key = keys[len++]

        if (!writable(target, source, key)) {
          flag = true
          break
        }

        target[key] = source[key]
      }

      if (flag) {
        break
      }
    }

    return target
  }
}

function writable(target, source, key) {
  let writable = false

  if (source.hasOwnProperty(key)) {
    writable = true
  }

  if (target[key]) {
    writable = Object.getOwnPropertyDescriptor(target, key).writable
  }

  return writable
}

export {
  _Object
}