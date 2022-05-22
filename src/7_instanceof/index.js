function InstanceOf({ __proto__ }, { prototype }) {

  while (true) {

    if (!__proto__) return false

    if (__proto__ === prototype) return true

    __proto__ = __proto__.__proto__
  }
}

export {
  InstanceOf
}