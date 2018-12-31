import React from 'react';
import { Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import CountryRoutes from './country/CountryRoutes';

const CountryTab = ({match}) => {
  return (
    <Tab.Pane attached={false}>     
      <CountryRoutes match={match} />
    </Tab.Pane>
  )
}

CountryTab.propTypes = {
  match: PropTypes.object.isRequired
};

export default CountryTab;