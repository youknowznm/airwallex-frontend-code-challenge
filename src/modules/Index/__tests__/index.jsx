import React from 'react'
import { mount } from 'enzyme'

import Routes from '~/routes'
import Modal from '~/components/Modal'
import TextField from '~/components/TextField'
import Index from '../index'

const sleep = delay => new Promise(resolve => {
  setTimeout(resolve, delay)
})

describe('<Routes />', () => {

  // test render:
  // - footer
  // - header
  // - container(and title, subtitle and request-invite button inside)
  it('page', async () => {
    const wrapper = mount(<Routes />)
    await sleep(100)
    wrapper.update()

    expect(wrapper.exists('.material-header')).toBe(true)
    expect(wrapper.exists('.material-footer')).toBe(true)
    expect(wrapper.exists('.material-container')).toBe(true)
    expect(wrapper.exists('.material-container .main-title')).toBe(true)
    expect(wrapper.exists('.material-container .main-subtitle')).toBe(true)
    expect(wrapper.exists('.material-container .btn-request')).toBe(true)
  })

  // test form modal:
  // - form fields validation
  // - visibility changing on click buttons
  // - error message display
  it('formModal', async () => {
    const wrapper = mount(<Routes />)
    await sleep(100)
    wrapper.update()

    expect(wrapper.find(Modal).at(0).prop('isOpen')).toBe(false)
    wrapper.find('.material-container .btn-request').at(0).simulate('click')
    expect(wrapper.find(Modal).at(0).prop('isOpen')).toBe(true)
    expect(wrapper.find(Modal).at(0).find('.modal-confirm').at(1).simulate('click'))
    expect(wrapper.find(Modal).at(0).find(TextField).at(0).prop('invalid')).toBe(true)
    expect(wrapper.find(Modal).at(0).find(TextField).at(1).prop('invalid')).toBe(true)
    expect(wrapper.find(Modal).at(0).find(TextField).at(2).prop('invalid')).toBe(true)

    wrapper.find(Index).setState({
      fieldFullName: 'foo',
      fieldEmail: 'bar@bar.com',
      fieldConfirmEmail: '',
    })
    expect(wrapper.find(Modal).at(0).find('.modal-confirm').at(1).simulate('click'))
    expect(wrapper.find(Modal).at(0).find(TextField).at(0).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(1).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(2).prop('invalid')).toBe(true)

    wrapper.find(Index).setState({
      fieldFullName: 'foo',
      fieldEmail: 'bar',
      fieldConfirmEmail: '',
    })
    expect(wrapper.find(Modal).at(0).find('.modal-confirm').at(1).simulate('click'))
    expect(wrapper.find(Modal).at(0).find(TextField).at(0).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(1).prop('invalid')).toBe(true)
    expect(wrapper.find(Modal).at(0).find(TextField).at(2).prop('invalid')).toBe(true)

    wrapper.find(Index).setState({
      fieldFullName: 'foo',
      fieldEmail: 'bar@bar.com',
      fieldConfirmEmail: 'bar@bar.cn',
    })
    expect(wrapper.find(Modal).at(0).find('.modal-confirm').at(1).simulate('click'))
    expect(wrapper.find(Modal).at(0).find(TextField).at(0).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(1).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(2).prop('invalid')).toBe(true)

    wrapper.find(Index).setState({
      fieldFullName: 'foo',
      fieldEmail: 'bar@bar.com',
      fieldConfirmEmail: 'bar@bar.com',
    })
    expect(wrapper.find(Modal).at(0).find('.modal-confirm').at(1).simulate('click'))
    expect(wrapper.find(Modal).at(0).find(TextField).at(0).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(1).prop('invalid')).toBe(false)
    expect(wrapper.find(Modal).at(0).find(TextField).at(2).prop('invalid')).toBe(false)

    wrapper.find(Index).setState({
      errorMessage: 'error',
    })
    expect(wrapper.find(Index).at(0).exists('.error-message')).toBe(true)

    wrapper.find(Index).setState({
      errorMessage: '',
    })
    expect(wrapper.find(Index).at(0).exists('.error-message')).toBe(false)
  })

  // test success modal:
  // - visibility changing on click buttons
  // - try re-attempt requesting invite
  it('successModal', async () => {
    const wrapper = mount(<Routes />)
    await sleep(100)
    wrapper.update()

    wrapper.find(Index).setState({
      formModalVisible: false,
      sendSuccessful: true,
    })
    expect(wrapper.find(Modal).at(0).prop('isOpen')).toBe(false)
    expect(wrapper.find(Modal).at(1).prop('isOpen')).toBe(true)
    wrapper.find(Modal).at(1).find('.modal-confirm').at(1).simulate('click')
    expect(wrapper.find(Modal).at(1).prop('isOpen')).toBe(false)

    expect(wrapper.find(Modal).at(0).prop('isOpen')).toBe(false)
    wrapper.find('.material-container .btn-request').at(0).simulate('click')
    expect(wrapper.find(Modal).at(0).prop('isOpen')).toBe(true)
  })
})