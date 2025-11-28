class _LazyMan {
  name: string
  queue: Function[]
  first: boolean
  timer: number

  constructor(name: string) {
    this.name = name

    this.queue = [() => { console.log(`Hi, I am ${this.name}`) }]

    this.first = false

    this.timer = 0

    setTimeout(() => this.next())
  }

  next() {
    clearTimeout(this.timer)

    this.timer = setTimeout(async () => {

      for (let i = 0; i < this.queue.length; i++) {
        await this.queue[i]()
      }
    })

    return this
  }

  sleepFirst(timer: number) {
    const { first } = this
    const sleep = () => this._sleepHelper(timer)

    if (first) {
      this.queue[0] = sleep
    } else {
      this.first = !first
      this.queue.unshift(sleep)
    }

    return this.next()
  }

  sleep(timer: number) {
    this.queue.push(() => this._sleepHelper(timer))

    return this.next()
  }

  eat(meal: string) {
    this.queue.push(() => console.log(`Eat ${meal}`))

    return this.next()
  }

  _sleepHelper(timer: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`sleep ${timer} s`)
        resolve()
      }, timer * 1000)
    })
  }
}


function LazyMan(name: string) {
  return new _LazyMan(name)
}

// test

LazyMan('Hank');
// 输出:
// Hi! This is Hank!
console.log()

LazyMan('Hank').sleep(3).eat('dinner')
// 输出:
// Hi! This is Hank!
// //等待3秒..
// Wake up after 3
// Eat dinner~
console.log()

LazyMan('Hank').eat('dinner').eat('supper')
// 输出:
// Hi This is Hank!
// Eat dinner~
// Eat supper~
console.log()

LazyMan('Hank').sleepFirst(2).eat('dinner').sleep(3).eat('supper')
// 输出:
// //等待2秒..
// Wake up after 2
// Hi This is Hank!
// Eat dinner~
// //等待3秒..
// Wake up after 2
// Eat supper~
