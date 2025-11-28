const isFunction = variable => typeof variable === 'function';

const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

const run = function (value, tasks) {
  setTimeout(() => {
    this.value = value
    let callback

    while (callback = tasks.shift()) {
      callback(value)
    }
  })
}

class Promise {

  constructor(executor: (resolve: Function, reject: Function) => void) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }

  private status = PENDING

  private value = undefined

  private rejectedQueue = []

  private fulfilledQueue = []

  private reject(error) {
    if (this.status !== PENDING) return

    this.status = REJECTED

    run.call(this, error, this.rejectedQueue)
  }

  private resolve(value) {
    if (this.status !== PENDING) return

    this.status = FULFILLED

    if (value instanceof Promise) {
      value.then(
        value => {
          run.call(this, value, this.fulfilledQueue)
        },
        error => {
          run.call(this, error, this.rejectedQueue)
        }
      )
    } else {
      run.call(this, value, this.fulfilledQueue)
    }
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(cb) {
    return this.then(
      value => Promise.resolve(cb()).then(() => value),
      reason => Promise.resolve(cb()).then(() => {
        throw reason
      })
    )
  }

  then(onFulfilled, onRejected?) {
    const { value, status } = this

    return new Promise((resolve, reject) => {
      const fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            resolve(value)
          } else {
            const res = onFulfilled(value)
            if (res instanceof Promise) {
              res.then(resolve, reject)
            } else {
              resolve(value)
            }
          }
        } catch (err) {
          reject(err)
        }
      }

      const rejected = (error) => {
        try {
          if (!isFunction(onRejected)) {
            reject(error)
          } else {
            const res = onRejected(error)
            if (res instanceof Promise) {
              res.then(resolve, reject)
            } else {
              resolve(error)
            }
          }
        } catch (err) {
          reject(err)
        }
      }

      switch (status) {
        case PENDING:
          this.fulfilledQueue.push(onFulfilled)
          this.rejectedQueue.push(onRejected)
          break;
        case FULFILLED:
          fulfilled(value)
          break;
        case REJECTED:
          rejected(value)
          break;
      }
    })

  }

  static all(list) {
    return new Promise((resolve, reject) => {

      let values = []
      let count = 0

      for (const [i, p] of list.entries()) {
        this.resolve(p).then(
          res => {
            values[i] = res
            count++;

            if (count === list.length) { resolve(values) }
          },
          err => {
            reject(err);
          }
        )
      }
    })
  }

  static allSettled(list) {
    return new Promise((resolve) => {
      if (list.length === 0) return resolve([])

      const result = []
      let count = 0

      for (let [i, p] of list.entries()) {
        this.resolve(p).then(
          res => {
            result[i] = {
              status: "fulfilled",
              value: res
            };
            count++;
            if (count === list.length) resolve(result);
          },
          err => {
            result[i] = {
              status: "rejected",
              reason: err
            };
            count++;
            if (count === list.length) resolve(result);
          }
        );
      }

    })
  }

  static any(list: any[]) {
    return new Promise((resolve, reject) => {
      if (list.length === 0) return reject('All promises were rejected')

      const errors = []
      let count = 0

      for (let [i, p] of list.entries()) {
        this.resolve(p).then(
          res => {
            resolve(res)
          },
          err => {
            errors[i] = err;
            count++;
            if (count === list.length) reject(errors);;
          }
        );
      }
    })
  }

  static race(list) {
    return new Promise((resolve, reject) => {
      for (let p of list) {
        this.resolve(p).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err);
          }
        )
      }
    })
  }

  static reject(value) {
    return new Promise((resolve, reject) => reject(value));

  }

  static resolve(value) {
    if (value instanceof Promise) return value

    return new Promise((resolve) => { resolve(value) })
  }

}

export default Promise