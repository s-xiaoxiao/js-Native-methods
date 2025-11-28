function Iterator(arr) {
  let index = 0

  const next = () => {
    return {
      value: arr[index++],
      done: index > arr.length
    }
  }

  return { next }
}

const it = Iterator([1, 2])

console.log(it.next().value)  // 1
console.log(it.next().value)  // 2
