/**
  需求：实现一个红绿灯问题
  
    黄灯：1s
    绿灯：2s
    红灯：3s
 */

/**
 * 
 * @param color 红绿灯的颜色
 * @param delay 红绿灯的延迟
 * @returns {Promise<color>}
 */

// 无限循环下去~

function Timer(color, delay) {

  console.log(color);

  return new Promise((resolve) => setTimeout(() => resolve(color), delay))
};

(async function () {
  while (true) {
    await Timer('yellow', 1000)
    await Timer('green', 2000);
    await Timer('red', 3000);
  }
})()