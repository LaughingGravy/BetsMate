import React from 'react';
import { Tab } from 'semantic-ui-react'

import CountryRoutes from './country/CountryRoutes';

const CountryTab = ({match}) => {
  return (
    <Tab.Pane attached={false}>     
      <CountryRoutes match={match} />
    </Tab.Pane>
  )
}

export default CountryTab;