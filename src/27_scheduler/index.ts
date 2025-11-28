
class Scheduler {

  max = 2 // 最大并发数
  count = 0 // 
  queue: Function[]

  constructor() {
    this.queue = []
  }

  async add(fn) {
    if (this.count >= this.max) {
      await new Promise((resolve) => this.queue.push(resolve))
    }

    this.count++
    const res = await fn()
    this.count--


    this.queue.length && this.queue.shift()()
    return res
  }
}

const timeout = (time: number) => {

  return new Promise((resolve) => setTimeout(resolve, time))
}

const scheduler = new Scheduler()

const addTask = (time, order) => {

  scheduler
    .add(() => timeout(time))
    .then(() => console.log(`${order}`))
}

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// 2 3 1 4



