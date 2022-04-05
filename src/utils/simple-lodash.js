const cloneDeep = target => {
  let res
  if (Array.isArray(target)) {
    res = []
  } else if (typeof target === 'object') {
    res = {}
  } else {
    res = target
    return res
  }
  for (const key in target) {
    res[key] = cloneDeep(target[key])
  }
  return res
}

const omit = (target, keys = []) => {
  const res = cloneDeep(target)
  keys.forEach(key => {
    delete res[key]
  })
  return res
}

const get = (source, path, defaultValue) => {
  // a[0].b -> ['a', '0', 'b']
  const paths = path
    .replace(/\[(\d+)]/g, (all, m1) => `.${m1}`)
    .split('.')
    .filter(item => item !== '')
  let result = source
  for (let i = 0; i < paths.length; i++) {
    // 转化 null 或 undefined 为空对象
    result = Object(result)[paths[i]]
    if (result === undefined) {
      return defaultValue
    }
  }
  return result
}

export {
  cloneDeep,
  omit,
  get,
}