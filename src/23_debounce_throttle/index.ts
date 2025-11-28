// debounce
// 防抖

/**
 * 
 * @param fn 执行函数
 * @param delay 延迟时间
 * @returns 具有延迟执行的函数
 */
function debounce(fn: Function, delay: number): Function {
  let timer

  return function (...args: any[]) {
    clearTimeout(timer)

    timer = setTimeout(
      () => fn.apply(this, args),
      delay
    )
  }
}


// throttle
// 节流

/**
 * 
 * @param fn 执行函数
 * @param delay 延迟时间
 * @returns 具有延迟的函数
 */
function throttle(fn: Function, delay: number): Function {

  let pre = 0;

  return function (...args: any[]) {
    let now = Date.now()

    if (now - pre > delay) {
      fn.apply(this, args);
      pre = now;
    }
  }
}



