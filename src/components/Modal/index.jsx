import React from 'react'
import PropTypes from 'prop-types'
import c from '~utils/classnames'
import Button from '~components/Button'
import {findDOMNode} from 'react-dom'
import {
  noop,
  getScrollBarWidth,
  hasClass,
  addClass,
  removeClass,
  isValidString,
} from '~utils'
import './style.scss'
import {createPortal} from 'react-dom'
import {SvgClose} from '../../assets/svg'

export default class Modal extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    confirmButtonText: PropTypes.string,
    cancelButtonText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    isOpen: PropTypes.bool,
    confirmOnly: PropTypes.bool,
    confirmDisabled: PropTypes.bool,
    errorMessage: PropTypes.string,
  }

  static defaultProps = {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    onConfirm: noop,
    onCancel: noop,
    isOpen: false,
    confirmOnly: false,
    confirmDisabled: false,
    errorMessage: '',
  }

  cancelListener = (evt) => {
    if (evt.keyCode === 27) {
      this.props.onCancel()
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.cancelListener)
  }

  componentWillUmount() {
    window.removeEventListener('keyup', this.cancelListener)
  }

  onClickCover = evt => {
    if (hasClass(evt.target,'material-modal')) {
      this.props.onCancel()
    }
  }

  componentDidUpdate(prevProps) {
    const body = document.body
    const materialHeaderContent = body.querySelector('.material-header .header-content')
    const paddingRightInPx = `${getScrollBarWidth()}px`
    if (prevProps.isOpen === false && this.props.isOpen === true) {
      if (this.modalRef) {
        // TODO
        // const ref = findDOMNode(this.modalRef)
        // const input = ref.querySelector('.modal-content input')
        // console.log({input})
        // input && input.focus()
        // const confirmBtn = ref.querySelector('.modal-confirm')
        // confirmBtn && confirmBtn.focus()
      }
      addClass(body, 'has-visible-modal')
      body.style.paddingRight = paddingRightInPx
      body.style.overflow = 'hidden'
      if (materialHeaderContent) {
        materialHeaderContent.style.paddingRight = paddingRightInPx
      }
    }
    if (prevProps.isOpen === true && this.props.isOpen === false) {
      removeClass(body, 'has-visible-modal')
      body.style.paddingRight = '0px'
      body.style.overflow = 'auto'
      if (materialHeaderContent) {
        materialHeaderContent.style.paddingRight = '0px'
      }
    }
  }

  modalRef = null
  setModalRef = ref => {
    this.modalRef = ref
  }

  render() {
    const {
      title,
      children,
      confirmButtonText,
      cancelButtonText,
      confirmOnly,
      isOpen,
      confirmDisabled,
      errorMessage,
    } = this.props

    if (!isOpen) {
      return null
    }

    const className = c(
      'material-modal',
      'visible',
      confirmOnly && 'confirm-only',
      this.props.className
    )

    return createPortal(
      <div
        className={className}
        onClick={this.onClickCover}
        ref={this.setModalRef}
      >
        <div className={'modal-inner'}>
          {
            isValidString(title) && (
              <h1
                className='modal-title'
              >
                {title}
              </h1>
            )
          }
          <SvgClose
            className={'icon-close'}
            onClick={this.props.onCancel}
          />
          <div className='modal-content'>
            {children}
          </div>
          <div className='modal-action-buttons'>
            <Button
              className='modal-confirm'
              onClick={this.props.onConfirm}
              type={'primary'}
              size={'small'}
              disabled={confirmDisabled}
            >
              {confirmButtonText}
            </Button>
            {
              !confirmOnly && (
                <Button
                  className='modal-cancel'
                  onClick={this.props.onCancel}
                  size={'small'}
                >
                  {cancelButtonText}
                </Button>
              )
            }
          </div>
          {
            isValidString(errorMessage) && (
              <p className={'error-message'}>
                {errorMessage}
              </p>
            )
          }
        </div>
      </div>,
      document.body
    )
  }
}