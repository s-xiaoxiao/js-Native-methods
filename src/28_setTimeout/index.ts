/**
 * 
 */

function mySetInterval(handler: Function, timeout: number, ...args: any[]): Function {
  let timer

  const interval = () => {

    timer = setTimeout(() => {

      handler.apply(null, args)
      interval()

    }, timeout)
  }

  interval()

  return () => clearTimeout(timer)
}


/**
 * 
 */

function MySetTimeout(handler: Function, timeout: number, ...args: any[]): number {
  const timer = setInterval(() => {

    clearInterval(timer)
    handler.apply(null, args)
    
  }, timeout)

  return timer
}

