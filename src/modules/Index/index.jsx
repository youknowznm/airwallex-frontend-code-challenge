import React from 'react'
import Typography from '~components/Typography'
import Button from '~components/Button'
import c from '~utils/classnames'
import './style.scss'
import Modal from '../../components/Modal'
import TextField from '../../components/TextField'
import {post} from '~utils/http-client'
import {get} from '~utils/simple-lodash'
import {requestInviteApi} from '~api'

export default class Index extends React.PureComponent {

  state = {
    formModalVisible: false,
    hasValidated: false,
    fieldFullName: '',
    fieldEmail: '',
    fieldConfirmEmail: '',
    isSending: false,
    errorMessage: '',
    sendSuccessful: false,
  }

  regExpFullName = /^\S{3,}$/
  regExpEmail = /^\w+@\w+\.\w+$/

  handleCLickRequestBtn = () => {
    this.setState({
      formModalVisible: true,
      hasValidated: false,
    })
  }

  setFieldValue = fieldKey => evt => {
    this.setState({
      [fieldKey]: evt.target.value,
      errorMessage: '',
    })
  }

  get fieldFullNameInvalid() {
    return this.state.hasValidated
      && !this.regExpFullName.test(this.state.fieldFullName)
  }

  get fieldEmailInvalid() {
    return this.state.hasValidated
      && !this.regExpEmail.test(this.state.fieldEmail)
  }

  get fieldConfirmEmailInvalid() {
    return this.state.hasValidated
      && (
        !this.regExpEmail.test(this.state.fieldConfirmEmail)
        || this.state.fieldConfirmEmail !== this.state.fieldEmail
      )
  }

  handleClickConfirm = () => {
    if (this.state.isSending) {
      return
    }
    this.setState(
      {
        hasValidated: true,
        errorMessage: '',
      },
      () => {
        if (
          this.fieldFullNameInvalid
          || this.fieldEmailInvalid
          || this.fieldConfirmEmailInvalid
        ) {
          return
        }
        this.sendRequest()
      })
  }

  sendRequest = () => {
    this.setState({
      isSending: true,
    })
    post(requestInviteApi, {
      name: this.state.fieldFullName,
      email: this.state.fieldEmail,
    }).then(res => {
      this.hideFormModal(() => {
        this.setState({
          sendSuccessful: true,
        })
      })
    }).catch(error => {
      this.setState({
        errorMessage: get(error, 'errorMessage', ''),
      })
    }).finally(() => {
      this.setState({
        isSending: false,
      })
    })
  }

  hideFormModal = callback => {
    this.setState({
      fieldFullName: '',
      fieldEmail: '',
      fieldConfirmEmail: '',
      hasValidated: false,
      formModalVisible: false,
      errorMessage: '',
    }, callback)
  }

  handleClickCancel = () => {
    if (this.state.isSending) {
      return
    }
    this.hideFormModal()
  }

  renderFormModal = () => {
    const commonProps = {
      hasValidated: this.state.hasValidated,
      width: '100%',
      disabled: this.state.isSending,
    }
    return (
      <Modal
        confirmOnly
        className={'form-modal'}
        title={'Request an invite'}
        isOpen={this.state.formModalVisible}
        confirmButtonText={this.state.isSending ? 'Sending, please wait...' : 'Send'}
        confirmDisabled={this.state.isSending}
        onConfirm={this.handleClickConfirm}
        onCancel={this.handleClickCancel}
        errorMessage={this.state.errorMessage}
      >
        <div className={'request-form'}>
          <TextField
            label={'Full Name'}
            value={this.state.fieldFullName}
            maxLength={20}
            invalid={this.fieldFullNameInvalid}
            onChange={this.setFieldValue('fieldFullName')}
            hint={'3~20 characters required.'}
            autoFocus
            {...commonProps}
          />
          <TextField
            label={'Email'}
            value={this.state.fieldEmail}
            onChange={this.setFieldValue('fieldEmail')}
            invalid={this.fieldEmailInvalid}
            maxLength={30}
            hint={'Common email format required.'}
            {...commonProps}
          />
          <TextField
            label={'Confirm Email'}
            value={this.state.fieldConfirmEmail}
            onChange={this.setFieldValue('fieldConfirmEmail')}
            invalid={this.fieldConfirmEmailInvalid}
            maxLength={30}
            hint={'Double-check your email address.'}
            {...commonProps}
          />
        </div>
      </Modal>
    )
  }

  hideSuccessModal = () => {
    this.setState({
      sendSuccessful: false,
    })
  }

  renderSuccessModal = () => {
    return (
      <Modal
        className={'success-modal'}
        confirmOnly
        title={'All done!'}
        isOpen={this.state.sendSuccessful}
        confirmButtonText={'OK'}
        onConfirm={this.hideSuccessModal}
        onCancel={this.hideSuccessModal}
      >
        <Typography variant={'body2'}>
          You will be one of the first to experience Broccoli & Co. when we launch.
        </Typography>
      </Modal>
    )
  }

  render() {
    return (
      <div className={c('page-index-wrap')}>
        <div className={'content'}>
          <Typography
            variant={'h1'}
            useMaterialSeparators
            className={'main-title'}
          >
            A better way
          </Typography>
          <Typography
            variant={'h1'}
            className={'main-title'}
            useMaterialSeparators
          >
            to enjoy every day
          </Typography>
          <Typography
            variant={'h3'}
            className={'main-subtitle'}
          >
            Be the first to know when we launch.
          </Typography>
          <Button
            className={'btn-request'}
            onClick={this.handleCLickRequestBtn}
            type={'primary'}
          >
            Request an invite
          </Button>
        </div>
        {this.renderFormModal()}
        {this.renderSuccessModal()}
      </div>
    )
  }
}