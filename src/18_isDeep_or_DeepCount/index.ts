function getObjectMaxDepthCount(object: {}): number {
  let maxDepth = 0;

  for (const key in object) {

    if (object.hasOwnProperty(key) && typeof object[key] === "object") {
      
      maxDepth = Math.max(maxDepth, getObjectMaxDepthCount(object[key]))
    }
  }

  // 此处加1：
  // 1：因为对象的深度是从1开始的，而不是0
  // 2：每次递归时，深度加1
  return maxDepth + 1
}