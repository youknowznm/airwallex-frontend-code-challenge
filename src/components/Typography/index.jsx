import React from 'react'
import PropTypes from 'prop-types'
import c from '~utils/classnames'
import './style.scss'
import '~utils'

export default class Typography extends React.Component {

  static propTypes = {
    variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'body1', 'body2']),
    className: PropTypes.string,
    useMaterialSeparators: PropTypes.bool,
    tag: PropTypes.oneOf(['span', 'p', 'a']),
  }

  static defaultProps = {
    variant: 'body1',
    className: '',
    useMaterialSeparators: false,
    tag: 'p',
  }

  renderText = () => {
    if (this.props.useMaterialSeparators) {
      return this.props.children
        .split(/\s+/).filter(item => item !== '')
        .map((item, index) => (
          <span className={'material-single-word'} key={index}>
            {item}
          </span>
        ))
    }
    return this.props.children
  }

  render() {
    const className = c(
      'material-typography',
      `variant-${this.props.variant}`,
      this.props.className
    )
    const DOMTag = this.props.tag
    return (
      <DOMTag className={className}>
        {this.renderText()}
      </DOMTag>
    )
  }
}