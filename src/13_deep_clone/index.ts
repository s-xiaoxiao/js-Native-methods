/**
 * @description 深拷贝方法。只针对JavaScript中的数据类型进行拷贝
 * @param {value}
 * @return {newValue}
 */
function DeepClone(value) {

  // 第一个判断是兼容 null undefined。其余不等于 object 直接返回都是原始类型
  if (!value || typeof value !== 'object') return value;
  if (value instanceof Date) return new Date(value)
  if (value instanceof RegExp) return new RegExp(value)
  
  if (value instanceof Array) return value.map(el => DeepClone(el))

  const newValue = {}
  const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)]
  const length = keys.length
  let len = 0, key

  while (length > len) {
    key = keys[len++]
    if (value.hasOwnProperty(key)) {
      newValue[key] = DeepClone(value[key])
    }
  }

  return newValue
}


/**
 * 前置知识
 * 
 * JavaScript 共有八种类型
 * 
 * 原始类型 (7) ：Number BigInt String boolean null undefined Symbol,
 * 
 * 引用类型 (1) ：Object
 */