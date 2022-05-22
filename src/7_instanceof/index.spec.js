import { test, expect } from 'vitest'
import { InstanceOf } from './index'

test('tests InstanceOf', () => {

  const a = 1

  const got = InstanceOf(a, Number)
  
  expect(got).toBe(true)
})
