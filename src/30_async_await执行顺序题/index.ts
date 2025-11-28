// first

const arr = ['a', 'b', 'c']

function* generator() {
  yield 1;
  yield* arr;
  yield 2;
}

for (const value of generator()) {
  console.log(value);
}

// 1 a b c 2


// second 
function* generator1() {
  yield 'a';
  return 'result';
  yield 'b';
}

var it = generator1();
console.log(it.next());
console.log(it.next());

// 'a' 'result'

// third
const firstPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(1), 5000)
  })
}

const secondPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(2), 3000)
  })
}


async function* generator3() {
  const firstPromiseResult = await firstPromise();
  yield firstPromiseResult
  const secondPromiseResult = await secondPromise();
  yield secondPromiseResult
}

var it = generator3()

async function abc() {
  for await (const value of it) {
    console.log(value)
  }
}

abc()

// 1 5s 
// 2 3s

// fourth

const myGenerator = (function* () {
  yield 1;
  yield 2;
  yield 3;
})()

for (const value of myGenerator) {
  console.log(value)
  break;
}
// 1

for (const value of myGenerator) {
  console.log(value)
}
// 无

// fifth

function* generator4(i) {
  yield i;
  yield i * 2;
}

const gen = generator4(10)

console.log(gen.next().value);
console.log(gen.next().value);

// 10 20


