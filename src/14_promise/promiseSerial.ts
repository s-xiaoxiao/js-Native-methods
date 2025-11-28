

export const mergePromise = (arr) => {

  const res = []

  return new Promise((resolve, reject) => {
    arr
      .reduce((pre, cur) =>
        pre
          .then(cur)
          .then((data) => res.push(data)),
        
        Promise.resolve()
      )
      .then(() => resolve(res))
  })
};

// 以上代码平铺为

Promise.resolve()
  .then(ajax1)
  .then(() => { push() })
  .then(ajax2)
  .then(() => { push() })
  .then(ajax3)
  .then(() => { push() })