import { test, expect } from 'vitest'
import {Sum } from './index'

test('tests Sum Methods', () => {

  const got = Sum(1)(2)(3).valueOf()

  expect(got).toBe(6)

})
