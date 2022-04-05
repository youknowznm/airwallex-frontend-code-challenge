import React from 'react'
import PropTypes from 'prop-types'

class Svg extends React.Component {
  static propTypes = {
    fill: PropTypes.string, // 'default', 'light', 'dark'
    width: PropTypes.number,
    height: PropTypes.number,
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultFill: PropTypes.string.isRequired, // 默认 fill 颜色
  }
  static defaultProps = {
    fill: 'default',
    className: '',
    width: 24,
    height: 24,
  }
  get computedFill() {
    const {
      fill,
      defaultFill,
    } = this.props
    if (fill === 'default') {
      return defaultFill
    }
    if (fill === 'dark') {
      return 'rgba(0, 0, 0, .7)'
    }
    if (fill === 'light') {
      return '#fff'
    }
    return fill
  }
  render() {
    const {
      width,
      height,
      defaultFill,
      fill,
      path,
      className,
      ...otherProps
    } = this.props
    return (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        height={`${height}px`}
        viewBox="0 0 24 24"
        width={`${width}px`}
        fill={this.computedFill}
        {...otherProps}
      >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d={path}/>
      </svg>
    )
  }
}

export const SvgHeart = props => (
  <Svg
    path={'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'}
    defaultFill={'#E91E63'}
    {...props}
  />
)

export const SvgClose = props => (
  <Svg
    path={'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'}
    defaultFill={'#5f6368'}
    {...props}
  />
)
export const SvgCopyright = props => (
  <Svg
    path={'M10.08 10.86c.05-.33.16-.62.3-.87s.34-.46.59-.62c.24-.15.54-.22.91-.23.23.01.44.05.63.13.2.09.38.21.52.36s.25.33.34.53.13.42.14.64h1.79c-.02-.47-.11-.9-.28-1.29s-.4-.73-.7-1.01-.66-.5-1.08-.66-.88-.23-1.39-.23c-.65 0-1.22.11-1.7.34s-.88.53-1.2.92-.56.84-.71 1.36S8 11.29 8 11.87v.27c0 .58.08 1.12.23 1.64s.39.97.71 1.35.72.69 1.2.91c.48.22 1.05.34 1.7.34.47 0 .91-.08 1.32-.23s.77-.36 1.08-.63.56-.58.74-.94.29-.74.3-1.15h-1.79c-.01.21-.06.4-.15.58s-.21.33-.36.46-.32.23-.52.3c-.19.07-.39.09-.6.1-.36-.01-.66-.08-.89-.23-.25-.16-.45-.37-.59-.62s-.25-.55-.3-.88-.08-.67-.08-1v-.27c0-.35.03-.68.08-1.01zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'}
    defaultFill={'#5f6368'}
    {...props}
  />
)