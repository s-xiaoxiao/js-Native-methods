function Calculate(value) {

  const add = (add) => Calculate(value + add)

  const subtract = (subtract) => Calculate(value - subtract)

  const result = () => value

  return {
    add,
    subtract,
    result
  }
}


class calculate {
  value: number
  status: string

  constructor(value: number) {
    this.value = value
    this.status = "pending"
  }

  add(value: number) {
    this.value += value
    return this
  }

  subtract(value: number) {
    this.value -= value
    return this
  }

  result() {
    return this.value
  }
}