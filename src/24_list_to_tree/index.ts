function arrayToTree(list) {
  const map = new Map();
  const len = list.length;
  let i = 0

  // 将数组转换为 Map
  while (true) {
    list[i].children = list[i].children || []
    
    map.set(list[i].id, list[i])

    i++
    if (i === len) break
  }

  i = 0
  const res = []

  // 将 Map 转换为 tree
  while (true) {
    // 此判断是为了区别不是处于树根.并且存在map中的节点
    if (list[i].pid && map.has(list[i].pid)) {

      //将当前节点添加到父节点的children中
      map.get(list[i].pid).children.push(list[i])
    } else {
      // 树根
      res.push(list[i])
    }

    i++;
    if (i === len) break
  }

  return res;
}

// 测试
const data = [
  // 注意这里，专门把pid为1的元素放一个在前面
  { id: 2, name: '部门2', pid: 1 },
  { id: 1, name: '部门1', pid: 0 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
  { id: 7, name: '部门7', pid: 6 },
]

console.log(JSON.stringify(arrayToTree(data), null, 2))
