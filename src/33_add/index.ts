function add(a, b) {
  const maxLen = Math.max(a.length, b.length)
  const aArr = a.split('')
  const bArr = b.split('')
  const result = []

  let flag = 0;
  for (let i = 0; i < maxLen; i++) {
    const value1 = aArr.length === 0 ? 0 : Number(aArr.pop())
    const value2 = bArr.length === 0 ? 0 : Number(bArr.pop())

    let sum = value1 + value2 + flag

    flag = ~~(sum / 10)

    sum = sum % 10

    result.unshift(sum)
  }

  if (flag !== 0) result.unshift(flag)


  return result.join('')
}

const a = "9007199254740991";
const b = "1234567899999999999";

add(a, b)   // '1243575099254740990'
