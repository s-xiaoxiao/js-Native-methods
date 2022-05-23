/**
 * 
 * @description 创建一个新对象并使用现有的对象来提供新创建的对象的__proto__;可选支持新增属性
 * 
 * @param {proto} 
 * @param {propertiesObject} 
 * 
 */
const _Object = {
  create(proto, propertiesObject) {
    // 例外
    if (!['object', 'function'].includes(typeof proto)) {
      throw new TypeError("大兄弟，第一个参数传错了，仔细瞧瞧")
    }

    function Target() { }
    Target.prototype = proto
    const target = new Target()

    if (propertiesObject) {
      Object.defineProperties(target, propertiesObject)
    }

    return target
  }
}


export {
  _Object
}