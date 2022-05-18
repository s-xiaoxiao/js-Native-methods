import { test, expect } from 'vitest'
import { Partial } from './index'

test('tests Partial', () => {

  const Add = (a, b?) => a + b

  const got = Partial(Add, 1)(3)

  expect(got).toBe(4)
})
