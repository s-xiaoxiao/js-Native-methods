/**
 * 类数组转数组
 * 
 * @param arrayLike 
 * 
 */
function ArrayLikeToArray(arrayLike) {

  const first = Array.prototype.slice.call(arrayLike)
  console.log(first)

  const second = Array.from(arrayLike)
  console.log(second)


  if (typeof arrayLike[Symbol.iterator] !== "function") {
    arrayLike[Symbol.iterator] = function* () {
      for (let i = 0; i < this.length; i++) {
        yield this[i]
      }
    }
  }

  const third = [...arrayLike]
  console.log(third)

  const fourth: any = []
  for (let i = 0; i < arrayLike.length; i++) {
    fourth[i] = arrayLike[i]
  }
  console.log(fourth)
};

