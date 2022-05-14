import { test, expect } from 'vitest'
import { Call, Apply } from './index'

test('tests function Call', () => {

  const name = {
    EnglishPrefix: "I'm ",
    fn: function () { }
  }

  const SayName = function (name: string) {
    return this.EnglishPrefix + name;
  }
  SayName.call2 = Call

  const got = SayName.call2(name, 'xiaoxiao')
  expect(got).toBe("I'm xiaoxiao")
})

test("test function Apply", () => {

  const person = {
    EnglishPrefix: "I'm ",
    age: "",
    fn: function () { }
  }

  const SayName = function (name: string, age: string) {
    return this.EnglishPrefix + name + ',' + age + ' years old';
  }
  SayName.Apply2 = Apply

  const got = SayName.Apply2(person, ['xiaoxiao', 18])
  expect(got).toBe("I'm xiaoxiao,18 years old")
})