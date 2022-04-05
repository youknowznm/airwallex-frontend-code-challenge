import React from 'react'
import config from '~config'
import Typography from '~components/Typography'
import './style.scss'

export default () => (
  <header className={'material-header'}>
    <div className={'nav-full-width-wrapper'}>
      <nav className={'nav-bar material-responsive'}>
        <Typography
          useMaterialSeparators
          variant={'h2'}
          className={'page-title'}
          title={config.siteName}
        >
          {config.siteName}
        </Typography>
      </nav>
    </div>
  </header>
)
