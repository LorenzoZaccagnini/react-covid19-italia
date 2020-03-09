import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import SingleRegion from './components/SingleRegion'
import AllRegions from './components/AllRegions'
import AllCities from './components/AllCities'
import Main from './components/Main'
import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop'

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={ Main } />
            <Route exact path='/region' component={ SingleRegion } />
          <Route exact path='/all_regions' component={ AllRegions } />c
          <Route exact path='/all_cities' component={ AllCities } />c
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )
