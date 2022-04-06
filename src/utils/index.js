export function callIfCallable(fn, ...params) {
  return typeof fn === 'function' && fn(...params)
}

export function noop() {}

export function hasClass(DOMNode, targetClassName) {
  return Array.from(DOMNode.classList).includes(targetClassName)
}

export function addClass(DOMNode, ...classNames) {
  DOMNode.classList.add(...classNames)
}

export const isValidString = target => typeof target === 'string' && target !== ''

export function removeClass(DOMNode, ...classNames) {
  DOMNode.classList.remove(...classNames)
}

export function getStyle(target, key) {
  return document.defaultView.getComputedStyle(target)[key]
}

export function getStyleInt(target, key) {
  return parseInt(getStyle(target, key), 10)
}

export const getScrollBarWidth = () => {
  const node = document.createElement('div')
  node.style.overflow = 'scroll'
  node.style.width = '100px'
  node.style.height = '100px'
  node.style.position = 'absolute'
  node.style.left = '-1000px'
  node.style.top = '-1000px'
  document.body.appendChild(node)
  const result = node.offsetWidth - node.clientWidth
  document.body.removeChild(node)
  return result
}

export const checkDevice = () => {
  let deviceType = 'desktop'
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    deviceType = 'mobile'
  }
  addClass(document.body, `device-${deviceType}`)
}