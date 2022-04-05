import Typography from '~components/Typography'
import Button from '~components/Button'
import c from '~utils/classnames'
import './style.scss'

export default () => {
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
          // type={'secondary'}
        >
          Request an invite
        </Button>
      </div>
    </div>
  )
}