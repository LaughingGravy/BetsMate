import React from 'react';
import { Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import StadiumRoutes from './stadium/StadiumRoutes';

const StadiumTab = ({ match }) => {
  return (
    <Tab.Pane attached={false}>     
      <StadiumRoutes match={match} />
    </Tab.Pane>
  )
}

StadiumTab.propTypes = {
  match: PropTypes.object.isRequired
};

export default StadiumTab;