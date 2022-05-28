// 实现原型链继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.sayName = function () {
  return this.name;
}

function Dog() {
  this.lickCount = 0
}

Dog.prototype = new Animal("Dog");

Dog.prototype.lick = function () {
  return ++this.lickCount
}

const dogInstance = new Dog()

dogInstance.lick() // 1

// 判断原型时候跟实例有关联
// 方法一
console.log(dogInstance instanceof Dog)
console.log(dogInstance instanceof Animal)
console.log(dogInstance instanceof Object)

// 方法二
console.log(Dog.prototype.isPrototypeOf(dogInstance))
console.log(Animal.prototype.isPrototypeOf(dogInstance))
console.log(Object.prototype.isPrototypeOf(dogInstance))

/**
 * 优点在于，不同对象具有相同点可以抽象出一个构造函数来写
 * 
 * 缺点在于：当这个相同点是一个引用类型时，所有实例都指向同一个引用地址。
 */


// 实现借用构造函数继承

function Fruit() {
  this.colors = ['red', "green"];
}

function Apple() {
  Fruit.call(this)
  this.name = "Apple"
}

const appleInstance1 = new Apple()
appleInstance1.colors.push("yellow")
console.log(appleInstance1.colors)

const appleInstance2 = new Apple()
console.log(appleInstance2.colors)
/**
 * 优点在于，继承原型链继承的优点，并且解决了原型链继承的缺点
 * 
 * 缺点在于：使用这种方法，丢失了引用原型
 */


// 实现组合继承
function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()

SubType.prototype.sayAge = function () {
  console.log(this.age)
}

let instance1 = new SubType("Nicholas", 29); 

instance1.colors.push("black"); 
console.log(instance1.colors); // "red,blue,green,black" 
instance1.sayName(); // "Nicholas"; 
instance1.sayAge(); // 29 

let instance2 = new SubType("Greg", 27); 
console.log(instance2.colors); // "red,blue,green" 
instance2.sayName(); // "Greg"; 
instance2.sayAge(); 

/**
 * 优点在于，继承构造函数继承的优点，并且解决了构造函数继承的缺点
 * 
 * 缺点在于：使用这种方法，创建原型时 会多创建原型的构造函数创建的数据
 */

