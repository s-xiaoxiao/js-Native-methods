function Partial(fn: Function, ...args: any[]) {
  return (...rest: any[]) => fn(...args, ...rest);
}


export {
  Partial
}