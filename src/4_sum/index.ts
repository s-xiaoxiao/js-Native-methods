
function Sum(...arg: number[]) {

  Sum.numbers.push(...arg);

  return Sum
}

Sum.numbers = []

Sum.valueOf = function (): number {
  return this.numbers.reduce((total: number, number: number) => total + number)
}



export {
  Sum
}