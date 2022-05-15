import { test, expect } from 'vitest'
import { ObjectFactory, Bind } from './index'

test('tests new', () => {
  const Person = function (name, age) {
    this.name = name
    this.age = age
  }

  Person.prototype.sayName = function () {
    return this.name
  }

  const name = 'xiaoxiao'
  const age = 18
  const person = ObjectFactory(Person, name, age)

  const gotName = person.sayName()
  expect(gotName).toBe("xiaoxiao")
})

test("test function Bind", () => {

  const name = 'xiao'
  const person = {
    name: 'xiaoxiao'
  }

  const SayName = function (from, to) {
    return this.name + ' ' + from + ' ' + to
  }

  SayName.Bind = Bind

  const sayName = SayName.Bind(person, 'china')

  const gotName = sayName('beijing')

  expect(gotName).toBe("xiaoxiao china beijing")
})