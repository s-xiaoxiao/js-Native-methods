const queuedObservable = new Set()

function observe(fn) {

  return queuedObservable.add(fn)
}

function observable(subscribe) {

  const target = new Proxy(subscribe, {
    set(target, key, value, receiver) {
      console.log(target, key, value)

      const result = Reflect.set(target, key, value, receiver);

      queuedObservable.forEach(observable => observable());

      return result;
    }
  });

  return target
}

const person = observable({
  name: 'John',
  age: 34,
})

function print() {
  console.log(`${person.name} ${person.age}`)
}

observe(print)