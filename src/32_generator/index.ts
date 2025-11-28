function generator(_ctx) {
  while (true) {
    switch ((_ctx.prev = _ctx.next)) {
      case 1:
        _ctx.next = 2;
        return "result1"
      case 2:
        _ctx.next = 4;
        return "result2"
      case 4:
        _ctx.next = 6
        return "result3"
      case 6:
      case "end":
        return _ctx.stop()
    }
  }
}

const ctx = {
  prev: 1,
  next: 1,
  done: false,
  stop: () => {
    this.done = true
  }
}

const gen = function () {
  const next = () => {

    return {
      value: ctx.done ? undefined : generator(ctx),
      done: ctx.done
    }
  }

  return { next }
}

const g = gen()

console.log(g.next().value); // result1
console.log(g.next().value); // result2
console.log(g.next().value); // result3
console.log(g.next().value); // undefined




