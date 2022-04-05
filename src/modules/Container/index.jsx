import React from 'react'
import c from '~utils/classnames'
import './style.scss'

export default (props) => (
  <div className={c('material-container', 'material-responsive')}>
    {props.children}
  </div>
)
