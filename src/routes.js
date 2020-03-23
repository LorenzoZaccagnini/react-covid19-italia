import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import SingleRegion from './components/SingleRegion'
import AllRegions from './components/AllRegions'
import AllCities from './components/AllCities'
import Main from './components/Main'
import ScrollToTop from './components/ScrollTop'
import RegionsMap from './components/RegionsMap'
import Topbar from './components/Topbar';

export default props => (
    <HashRouter>
      <ScrollToTop>
        <Topbar />
        <Switch>
          <Route exact path='/' component={ Main } />
          <Route exact path='/region' component={ SingleRegion } />
          <Route exact path='/all_regions' component={ AllRegions } />
          <Route exact path='/all_cities' component={ AllCities } />
          <Route exact path='/regions_map' component={ RegionsMap } />c
        </Switch>
      </ScrollToTop>
    </HashRouter>
  )
