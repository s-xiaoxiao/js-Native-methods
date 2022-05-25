import { test, expect, describe } from 'vitest'
import { _Object } from './index'

describe("test assignment", () => {

  test('复制对象', () => {
    const target = {}

    const got = _Object.assign(target, { a: 1 })
    expect(got).has.property('a')
  })

  test('深拷贝问题', () => {
    const obj1 = { a: 0, b: { c: 0 } }

    let obj2 = _Object.assign({}, obj1)
    expect(JSON.stringify(obj2)).toBe(`{"a":0,"b":{"c":0}}`)

    obj1.a = 1;
    expect(JSON.stringify(obj1)).toBe(`{"a":1,"b":{"c":0}}`)
    expect(JSON.stringify(obj2)).toBe(`{"a":0,"b":{"c":0}}`)

    obj2.a = 2;
    expect(JSON.stringify(obj1)).toBe(`{"a":1,"b":{"c":0}}`)
    expect(JSON.stringify(obj2)).toBe(`{"a":2,"b":{"c":0}}`)

    obj2.b.c = 3;
    expect(JSON.stringify(obj1)).toBe(`{"a":1,"b":{"c":3}}`)
    expect(JSON.stringify(obj2)).toBe(`{"a":2,"b":{"c":3}}`)
  })

  test('合并对象', () => {
    const o1 = { a: 1 }
    const o2 = { b: 2 }
    const o3 = { c: 3 }

    const got = _Object.assign(o1, o2, o3);

    expect(got).toEqual({ a: 1, b: 2, c: 3 })
  })

  test('测试具有相同属性的对象', () => {
    const o1 = { a: 1, b: 1, c: 1 }
    const o2 = { b: 2, c: 2 }
    const o3 = { c: 3 }

    const got = _Object.assign(o1, o2, o3);

    expect(got).toEqual({ a: 1, b: 2, c: 3 })
  })

  test('拷贝 Symbol 类型属性', () => {
    const o1 = { a: 1 }
    const o2 = { [Symbol('foo')]: 2 }

    const got = _Object.assign({}, o1, o2);

    expect(got).has.property('a')
    expect(got).has.property(Object.getOwnPropertySymbols(o2)[0])
  })

  test('原型链上的属性和不可枚举属性不能被赋值', () => {

    const obj = Object.create({ foo: 1 }, {
      bar: { value: 2 },
      baz: { value: 3, enumerable: true }
    })


    const got = _Object.assign({}, obj)

    expect(got).toEqual({ baz: 3 })
  })

  test('基本类型会被包装为对象', () => {

    const v1 = "abc"
    const v2 = true
    const v3 = 10
    const v4 = Symbol('foo')

    const got = Object.assign({}, v1, null, v2, undefined, v3, v4)

    expect(got).toEqual({ "0": "a", "1": "b", "2": "c" })
  })

  test("异常会打断后续拷贝任务", () => {
    const target = Object.defineProperty({}, 'foo', {
      value: 1,
      writable: false,
      enumerable: true // node 跟浏览器环境不一致
    })

    const got = _Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 })
    
    expect(got).toEqual({ foo: 1, bar: 2, foo2: 3 })
  })

})

