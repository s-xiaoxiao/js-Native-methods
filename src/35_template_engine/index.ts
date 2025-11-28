let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
// {{name}} {{ name }}
const reg = /\{\{\s*(\w+)\s*\}\}/

function render(template, data) {

  const name = reg.exec(template)

  if (name !== null) {
    template = template.replace(reg, data[name[1]] || "")

    return render(template, data)
  }

  return template
}

render(template, data); // 我是姓名，年龄18，性别
