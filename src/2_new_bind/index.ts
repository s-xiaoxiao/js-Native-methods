/*
 * @Author: sunxiaochuang 460046653@qq.com
 * @Date: 2022-05-15 19:23:01
 * @LastEditors: sunxiaochuang 460046653@qq.com
 * @LastEditTime: 2022-06-19 23:05:30
 * @FilePath: \js-native-methods\src\2_new_bind\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable")
  }

  const self = this
  const fNOP = function () { }
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