class EventEmitter {

  // 事件池
  events: { [key: string]: Function[] }

  constructor() {
    this.events = {}
  }

  // 注册事件
  on(eventName: string, callback: Function) {
    this.events[eventName] = this.events[eventName]?.concat(callback) || [callback]
  }

  // 触发事件
  emit(eventName: string) {
    this.events[eventName].forEach(callback => callback())
  }

  // 移除事件
  removeListener(eventName: string, listener: Function) { // listener: Function
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(callback => callback !== listener)
    }
  }
}