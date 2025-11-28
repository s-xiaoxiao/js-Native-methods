
import { test, expect } from 'vitest'
import { mergePromise } from './promiseSerial'

const timeout = (ms) =>

  new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () => timeout(1000).then(() => 1);

const ajax2 = () => timeout(2000).then(() => 2);

const ajax3 = () => timeout(1000).then(() => 3);

test('promise serial', async () => {

  const result = await mergePromise([ajax1, ajax2, ajax3])

  expect(result).toEqual([1, 2, 3])

})

