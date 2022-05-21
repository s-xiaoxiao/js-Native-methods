// 本例子只考虑 浏览器环境
// Question 1
{
  var length = 10 // 注：用于声明一个函数范围或全局范围的变量，并可将其初始化为一个值
  function fn() {
    return this.length + 1
  }
  var obj = {
    length: 5,
    test1: function () {
      return fn()
    }
  }

  obj.test2 = fn

  // test1 返回的是 fn函数的返回的值。 调用fn时，this 根据定义上下文来确定的，所以拿到的是window上的length。
  console.log(obj.test1()) // 11

  // 跟上面返回是一样的，  call 只是改变了调用函数运行时的this。注：null或者undefined时则会自动替换为全局对象
  console.log(obj.test1.call()) // 11 

  // 调用 call,没有传this,则指向 window 看上条
  console.log(obj.test2.call()) // 11

  // this 值取决于函数被调用的方式。 obj 调用了 test2 -> fn。this 指向了obj
  console.log(obj.test2()) // 6

  /*
   *  第一个问题主要关注的是，
   *  函数里的this 是由调用方式决定了this值。
   *      第一：直接调用 fn()  this -> window 
   *      第二：obj.fn()  this -> obj
   *  call 函数调用的方式。没有参数,this则指向 window, 否则this->第一个参数
  **/

}

// Question 2
{
  window.number = 2

  var obj = {
    number: 3,
    db1: (function () {
      console.log(this)
      this.number *= 4
      return function () {
        console.log(this)
        this.number *= 5
      }
    })()
  }
  // 创建 键值对时，ob1 值是IIFE(立即调用函数表达式)。 this 是window 。 window.number = 8
  // IIFE 跟 fn() 调用是一样的， this 的指向遵循第一个问题最后的总结

  var db1 = obj.db1

  db1()  // this - window , window.number = 40
  obj.db1() // this - obj , obj.number = 15
  console.log(obj.number);    // 15
  console.log(window.number); // 40

  /*
   *  第二个问题主要关注的是，
   *  IIFE this 跟 第一个问题 fn 函数是一样的，IIFE 也可以使用 call、apply、bind 等改变this的方法。
   *      第一：IIFE 默认this 是 window.
   *      第二：call、apply、bind调用方式 this -> 第一个参数
  **/

}

// Question 3
{
  function foo(something) {
    this.a = something
  }

  var obj1 = {
    foo
  }

  var obj2 = {}

  obj1.foo(2)  //obj1 对象 创建一个 键值对 a:2
  console.log(obj1.a) // 2

  obj1.foo.call(obj2, 3);  // 调用obj1.foo 方法，call改变 this-> obj2。 obj2上创建一个键值对 a:3
  console.log(obj2.a) // 3

  var bar = new obj1.foo(4) // foo 被当作构造函数。new 将会创建一个新的对象并返回。 bar.a : 4
  console.log(obj1.a)  // 2 
  console.log(bar.a)   // 4

  /*
   *  第三个问题主要关注的是，
   *  函数的this 指向是由运行时决定的。目前由 call、apply、bind方法，显式改变this 指向
   * 
   *  当函数被 new 操作符时，this 指向了 某实例 {}
   **/
}

// Question 4
{
  var name = "window"

  var person = {
    name: "person",
    sayName: function () {
      console.log(this.name)
    }
  }

  function sayName() {
    var sss = person.sayName
    sss()                    // window
    person.sayName();        // person 
    (person.sayName)();      // person
    (b = person.sayName)()   // window
  }

  sayName()


  /*
   *  第四个问题主要关注的是，
   *      
   *  this 调用规则仍然适用，没有其他边界问题
   **/

}

// Question 5
{
  var name = "window"

  var person1 = {
    name: "person1",
    foo1: function () {
      console.log(this.name)
    },
    foo2: () => console.log(this.name),
    foo3: function () {
      return function () {
        debugger;
        console.log(this.name)
      }
    },
    foo4: function () {
      return () => {
        console.log(this.name)
      }
    }
  }

  var person2 = { name: "person2" }

  person1.foo1()                // person1
  person1.foo1.call(person2)    // person2

  person1.foo2()                // window
  person1.foo2.call(person2)    // window

  person1.foo3()()              // window
  person1.foo3.call(person2)()  // window
  person1.foo3().call(person2)  // person2

  person1.foo4()()              // person1
  person1.foo4.call(person2)()  // person2
  person1.foo4().call(person2)  // person1

  /*
   *  第五个问题主要关注的是，
   *      
   *  foo1  跟上述问题中有无其他变化，不再赘述
   *  foo2  箭头函数没有this, 箭头函数this 是定义时上层作用域中的this。
   *        由于对象不构成单独的作用域, this - window 对象
   *  foo3  person1.foo3()()  // 调用时可以理解为 person1.foo3() - fn() this 指向 window 
   *  foo4  跟foo2 区别在于 箭头函数没有this. call、apply、bind方法无效，根据上层this
   **/
}

// Question 6
{
  var name = "window"

  function Person(name) {
    this.name = name
    this.foo1 = function () {
      console.log(this.name)
    }

    this.foo2 = () => console.log(this.name)

    this.foo3 = function () {
      return function () {
        console.log(this.name)
      }
    }

    this.foo4 = function () {
      return () => {
        console.log(this.name)
      }
    }
  }

  var person1 = new Person("person1")
  var person2 = new Person("person2")

  person1.foo1()                // person1
  person1.foo1.call(person2)    // person2

  person1.foo2()                // person1
  person1.foo2.call(person2)    // person1

  person1.foo3()()              // window
  person1.foo3.call(person2)()  // window 

  person1.foo4()()              // person1
  person1.foo4.call(person2)()  // person2
  person1.foo4().call(person2)  // person1

  /*
   *  第六个问题主要关注的是，
   *      
   *  foo1、foo3、foo4  跟第五题中，是一样的，
   *  foo2 箭头函数本身没有this。 在适用 new 创建实例时 会创建一个空对象 箭头函数绑定了这个空对象
   **/
}

// Question 7
{
  var name = "window"

  function Person(name) {
    this.name = name;

    this.obj = {
      name: "obj",
      foo1: function () {
        return function () {
          console.log(this.name)
        }
      },
      foo2: function () {
        return () => {
          console.log(this.name)
        }
      }
    }
  }

  var person1 = new Person("person1")
  var person2 = new Person("person2")

  person1.obj.foo1()()               // window
  person1.obj.foo1.call(person2)()   // window
  person1.obj.foo1().call(person2)   // person2

  person1.obj.foo2()()               // obj
  person1.obj.foo2.call(person2)()   // person2
  person1.obj.foo2().call(person2)() // obj

  /*
   *  第七个问题主要关注的是，
   *      
   *  看作成熟练之前的题
   **/
}

// Question 8
{
  var x = 0

  // 当函数的参数有默认值时, 会形成一个新的作用域, 这个作用域用于保存参数的值（所以不会修改全局的变量）
  function foo(x, y = function () { x = 3; console.log(x) }) {
    console.log(x)

    var x = 2

    console.log(x)

    y()

    console.log(x)
  }

  foo(1)
  console.log(x)

  /**
   * 1
   * 2
   * 3
   * 2
   * 0
   */

  /*
   *  第八问题主要关注的是，
   *      函数默认参数    函数参数的作用域定义的变量 跟 函数体定义的不处于一个。
   **/

}

// Question 9
{
  Function.prototype.a = function () {
    console.log("我是a")
  }

  Object.prototype.b = function () {
    console.log("我是b")
  }

  function A() { }
  var c = new A()

  A.a()  // 我是a // 来自 a.__proto__.a
  A.b()  // 我是b // 来自 a.__proto__.__proto__.b 

  c.a()  // is not a function
  c.b()  // 我是B

  Function.b() //Function.prototype.b
  Object.a()   // Object.__proto__.b 

  /*
   *  构造函数 带有原型对象  Constructor.prototype
   *  创建构造函数的实例的 instance.__proto__ === Constructor.prototype 构成原型链
   *  
   *  Function 构造函数的原型链 等于自己的原型。自己的原型的原型是 Object.prototype
   *  Function.__proto__ === Function.prototype
   *  Function.prototype.__proto__ === Object.prototype
   *  
   *  Object 是由Function 构造的。原型链指向了 Function.prototype
   *  Object.__proto__ === Function.prototype
   * 
   *  Object 的原型，原型链为 null 。null 没有原型
   *  Object.prototype.__proto__ === null
   * 
   *  第八问题主要关注的是，
   *  A.a() 函数A 调用原型方法a
   *  A.b() 函数A 调用原型-原型方法b 。先看看自己 - 构造函数原型- 构造函数原型的原型
   * 
   *  c.a() //直接报错了。 由于 new 操作符返回一个对象的实例。c看看自己有没有 没有到A的prototype 没有到Object.prototype 也没有就直接报错了
   *  c.b() // 在自己原型上的原型找到 Object.b
   * 
   *  Function.b()  Function.__proto__.__proto__ === Object.prototype
   *  Object.a()    Object.__proto__ === Function.prototype
   **/
}

// Question 10
{

  // 请用你的语言来描述原型链和this指向的相关概念～
  // 

  /**
   *  原型链
   *        构造函数具有原型对象，当创建构造函数实例时，当前实例 __proto__ 属性 指向构造函数的原型（prototype）
   *  
   *  this
   *       如同 筷子，谁调用了吃饭的方法，就执行夹菜行为，谁调用了就放在谁碗里。
   *       this 就如同使用筷子的对象
   */

}

// Question 11
{
  function Fn() {
    this.name = 'xiaoxiao'
    this.age = '18'
  }

  function Fn1() {
    this.age = '20'
  }

  Fn.prototype.getName = function () {
    console.log(this.name)
  }

  Object.prototype.getAge = function () {
    console.log(this.age)
  }

  let f1 = new Fn()
  f1.getName()      // xiaoxiao
  f1.getAge()       // 18

  let f2 = new Fn1()
  f2.getAge()       // 20

  /**
   * 第11问题主要关注的是，
   * 
   * 普通函数被谁调用，this 就指向谁
   * 
   * f1.getName()      // xiaoxiao 第一层原型
   * f1.getAge()       // 18       第二层原型
   * 
   * f2.getAge()       // 20       第二层原型
   */
}
