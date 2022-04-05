import React from 'react'
import c from '~utils/classnames'
import {SvgHeart, SvgCopyright} from '~/assets/svg'
import config from '~config'
import './style.scss'
import Typography from '~components/Typography'

const svgSize = 14

export default () => (
  <footer className={'material-footer'}>
    <div className='info material-responsive'>
      <Typography variant={'body2'} tag={'p'}>
        Made with
        <SvgHeart
          className={'heart'}
          width={svgSize}
          height={svgSize}
          fill={'#ff5252'}
        />
        by
        <a
          className={'link'}
          target={'_blank'}
          href={config.authorGithub}
        >
          {config.authorName}
        </a>
        .
      </Typography>
      <Typography variant={'body2'} tag={'p'}>
        <SvgCopyright
          width={svgSize}
          height={svgSize}
        />
        2020 Broccoli & Co. All rights reserved.
      </Typography>
    </div>
  </footer>
)