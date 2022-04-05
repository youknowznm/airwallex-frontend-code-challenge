import React from 'react'
import PropTypes from 'prop-types'
import c from '~utils/classnames'
import {
  noop, isValidString,
} from '~utils'
import './style.scss'
import {findDOMNode} from 'react-dom'

export default class TextField extends React.Component {

  static propTypes = {
    type: PropTypes.oneOf(['text', 'password', 'number']),
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    maxLength: PropTypes.number,
    width: PropTypes.string,
    disabled: PropTypes.bool,
    hint: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool,
  }

  static defaultProps = {
    type: 'text',
    label: 'Text TextField',
    value: '',
    defaultValue: '',
    width: 180,
    maxLength: 20,
    disabled: false,
    hint: '',
    onChange: noop,
    placeholder: '',
    autoFocus: false,
  }

  state = {
    focused: false,
  }

  isUncontrolled = false

  get notEmpty() {
    return this.props.value !== ''
  }

  get currentCharCount() {
    return this.props.value.length
  }

  constructor(props) {
    super(props)
    if (isValidString(this.props.defaultValue)) {
      this.isUncontrolled = true
    }
  }

  ref = null
  setRef = ref => {
    if (this.ref === null) {
      this.ref = ref
      this.ref.addEventListener('focus', () => {
        this.setState({
          focused: true,
        })
        findDOMNode(this.ref).focus()
      })
      this.ref.addEventListener('blur', () => {
        this.setState({
          focused: false,
        })
        findDOMNode(this.ref).blur()
      })
    }
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.setState({
        focused: true,
      })
      findDOMNode(this.ref).focus()
    }
  }

  render() {
    const className = c(
      'material-text-field',
      this.props.className,
      this.state.focused && 'focused',
      this.notEmpty && 'not-empty',
      this.props.invalid && 'invalid',
    )
    const style = {
      width: this.props.width,
    }
    const placeholder = this.state.focused ? this.props.placeholder : ''
    const valueProps = {}
    if (this.isUncontrolled) {
      valueProps.defaultValue = this.props.defaultValue
    } else {
      valueProps.value = this.props.value
    }
    return (
      <div className={className}>
        <div
          className={c(
            'input-content',
            this.props.disabled && 'disabled'
          )}
          style={style}
        >
          <label>{this.props.label}</label>
          <input
            ref={this.setRef}
            type={this.props.type}
            maxLength={this.props.maxLength}
            placeholder={placeholder}
            onChange={this.props.onChange}
            disabled={this.props.disabled}
            spellCheck='false'
            {...valueProps}
          />
          <p className='hint'>{this.props.hint}</p>
          <p className='char-counter'>
            <span className='current'>{this.currentCharCount}</span>
            <span className='separator'>/</span>
            <span className='maximum'>{this.props.maxLength}</span>
          </p>
        </div>
      </div>
    )
  }
}