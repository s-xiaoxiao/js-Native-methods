/**
 * ES6中 class 继承和ES5中 prototype 继承区别
 * 
 * 1. 创建带有原型的实例
 * 
 * 在ES5中，使用构造函数的创建实例时，构造函数的 prototype 值作为实例的原型。
 * 在ES6中，使用new class创建实例时块作用域内定义的普通方法为实例的原型。
 * 
 * 2. 继承
 * 在ES5中，需要继承其他对象的构造函数需要设置当前 prototype = 继承对象的实例
 *     如果需要继承构造函数创建的键值对，需要使用 构造函数.call 方法 
 * 在ES6中，需要继承其他类的类需要使用 extends关键字 class {} extends SuperClass。
 *     如果需要继承的类或者构造函数的键值对，需要调用super()方法。相当于调用 super.constructor() 
 *     注意在调用super() 之前不要使用 this，否则会报错 referenceError
 * 
 *  
 * 
 * 
 * 不管是用构造函数或者类（Class）.背后依然使用的是原型链（class 也可以继承普通的构造函数（保持向后兼容））
 * 
 */
class Person {
  name: any;
  age: any;
  
  constructor(name, age) {
    this.name = name;
    this.age = age
  }
}

class Boy extends Person {
  constructor(name, age) {
    super(name, age)
  }
  sayHi() {
    console.log('Hi ')
  }
}

// 相对比寄生组合式继承。class 从原生的语法支持了该操作。还是很香的