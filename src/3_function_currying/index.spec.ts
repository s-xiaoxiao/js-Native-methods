import { test, expect } from 'vitest'
import { Curry } from './index'

test('tests FunctionCurrying', () => {
  function add(a, b, c, d) {
    return a + b + c + d
  }

  const addCurrying = Curry(add)

  const got = addCurrying(1)(2)(3)(4)

  expect(got).toBe(10)
})
