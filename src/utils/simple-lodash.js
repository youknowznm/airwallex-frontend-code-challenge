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

export {
  cloneDeep,
  omit,
}