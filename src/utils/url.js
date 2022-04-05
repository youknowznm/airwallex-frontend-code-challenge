// 参数读写
export const getParams = paramString => {
  const paramArr = paramString.split('&')
  const result = {}
  for (let i = 0; i < paramArr.length; i++) {
    let [key, value] = paramArr[i].split('=')
    if (key !== '' && value !== undefined) {
      result[key] = value
    }
  }
  return result
}

export const getSearchParams = (str = location.search) => {
  return getParams(str.replace(/^\?/, ''))
}

export const setSearchParams = (url, params) => {
  const prevParams = getSearchParams()
  // 覆写已有的
  for (let key in params) {
    prevParams[key] = params[key]
  }
  let fullSearchString = ''
  for (let key in params) {
    fullSearchString += `${key}=${params[key]}`
  }
  let result = url
  if (/\?/.test(url)) {
    result = result.replace(/\?.*$/, fullSearchString)
  } else if (fullSearchString !== '') {
    result += `?${fullSearchString}`
  }
  return result
}