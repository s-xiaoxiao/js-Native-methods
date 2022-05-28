// 原型式继承
function object(o) {
  function F() { }

  F.prototype = o

  return new F()
}

const person = {
  name: "xiaoxiao",
  friends: ["xiao"]
}


const personInstance1 = object(person)
personInstance1.name = "xiaoxiao1"
personInstance1.friends.push("xiaoxiao1")
console.log(personInstance1) // 自身有一个name属性

const personInstance2 = object(person)
personInstance2.name = "xiaoxiao2"
personInstance2.friends.push("xiaoxiao2")
console.log(personInstance2) // 自身有一个name属性

console.log(person) // friends 添加了两个值

/**
 * 思路: 创建一个临时构造函数. 将传入的对象作为构造函数的原型.并且返回构造函数的实例.达到原型式继承
 * 
 * 优点: 在于 创建新对象时同时需要对某个对象的引用
 * 
 * 缺点: 除了优点之外就是缺点
 * 
 * 场景: 抽象 蚂蚁窝. 每个蚂蚁(实例)需要对蚂蚁窝(原型)进行记忆
 */

// 寄生式继承

function createAnother(original) {
  const clone = object(original)

  clone.sayHi = function () {
    console.log('hi')
  }

  return clone
}

const fruit = {
  name: "Apple",
  colors: ["red", "green", "yellow"]
}

const fruitInstance = createAnother(fruit)

fruitInstance.sayHi()
/**
 * 思路: 在原型式继承上. 增强该实例.并且返回
 * 
 * 优点: 在于 创建新对象时同时需要对某个对象的引用. 跟原型式继承之外. 增强了值可以为该对象私有
 * 
 * 缺点: 除了优点之外就是缺点
 * 
 * 场景: 抽象 蚂蚁窝. 每个蚂蚁(实例)需要对蚂蚁窝(原型)进行记忆. 像兵蚂(具有攻击方法) 还有战斗的情况需要
 */

// 寄生组合式继承
function inheritPrototype(subType, superType) {
  const prototype = object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"]
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function () {
  console.log(this.age)
}
/**
 * 思路: 创建一个对象作为子类的原型.该对象的原型是父类的原型
 * 
 * 优点: 跟组合继承相比.可以避免在创建子类原型时使用new 构造函数创建的对象具有两组构造函数创建的属性存在 (一个在实例,一个在原型) . 
 * 
 * 缺点: 除了优点之外就是缺点 (相对比寄生式继承 一些方法只需创建一次,其他该实例则共享该方法)
 * 
 * 场景: 抽象 蚂蚁窝. 每个蚂蚁(实例)需要对蚂蚁窝(原型)进行记忆. 像兵蚂(具有攻击方法) 还有战斗的情况需要
 */