// thisArg 应该
interface ThisArg {
  fn: Function
}

declare global {
  interface Window {
    fn: Function;
  }
}

function Call(thisArg: ThisArg, ...args: any[]) {
  const context = thisArg || window

  context.fn = this

  const got = thisArg.fn(...args)

  delete thisArg.fn

  return got
}



function Apply(thisArg: ThisArg, args: any[]) {
  const context = thisArg || window
  context.fn = this

  let result

  if (!args.length) {
    result = context.fn()
  } else {
    result = context.fn(...args)
  }
  
  delete thisArg.fn
  return result
}


export {
  Call,
  Apply,
}