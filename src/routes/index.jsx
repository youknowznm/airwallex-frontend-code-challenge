import React, {useEffect} from 'react'
import {
  BrowserRouter,
  Switch,
  useLocation,
  Route,
} from 'react-router-dom'
import loadable from '@loadable/component'

const Container = loadable(() => import('~/modules/Container'))
const Header = loadable(() => import('~/modules/Header'))
const Footer = loadable(() => import('~/modules/Footer'))
const Index = loadable(() => import('~/modules/Index'))

const ScrollToTop = () => {
  const {
    pathname,
    search,
  } = useLocation()
  useEffect(
    () => {
      window.scrollTo(0, 0)
    },
    [pathname, search]
  )
  return null
}

export default function Routes() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Container>
        <Switch>
          <Route exact path="/">
            <Index/>
          </Route>
          <Route path="/">
            <p className={'page-not-found'}>
              Not Found.
            </p>
          </Route>
        </Switch>
      </Container>
      <Footer/>
    </BrowserRouter>
  )
}