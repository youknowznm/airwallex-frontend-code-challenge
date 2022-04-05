import {toast} from '~/components/Toast'
import {setSearchParams} from './url'

export function ajax(
  method,
  url,
  data = {},
  isJson = true
) {
  return new Promise(function(resolve, reject) {
    const isGetMethod = method === 'GET'
    const xhr = new XMLHttpRequest()
    if (isGetMethod) {
      url = setSearchParams(url, data)
    }
    xhr.open(method, url)
    if (isJson) {
      xhr.setRequestHeader('Content-Type', 'application/json')
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res = xhr.response
          try {
            res = JSON.parse(xhr.response)
          } catch (e) {}
          if (res.message) {
            toast(res.message)
          }
          resolve(res)
        } else {
          let errorMessage = xhr.response
          try {
            errorMessage = JSON.parse(xhr.response)
          } catch (e) {}
          toast(errorMessage)
          reject(errorMessage)
        }
      }
    }
    xhr.onerror = err => {
      reject(err)
    }
    xhr.send(isJson ? JSON.stringify(data) : data)
  })
}

export function get(url, data) {
  return ajax('GET', url, data)
}

export function post(url, data) {
  return ajax('POST', url, data)
}

export function postForm(url, data) {
  return ajax('POST', url, data, false)
}