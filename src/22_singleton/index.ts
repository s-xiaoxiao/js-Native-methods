class Singleton {

  static instance

  constructor() {
    return Singleton.instance
  }

  static getInstance() {
    if (!this.instance) this.instance = new Singleton()

    return this.instance
  }
}

// test

const instance = Singleton.getInstance()
const instance1 = Singleton.getInstance()

instance === instance1




