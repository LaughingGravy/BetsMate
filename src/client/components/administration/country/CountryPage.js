import React from 'react';
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import { withUser } from '../../contexts/withUserContext'

const CountryPage = ({ userCtx, children }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        {(userCtx.isAuthenticated && userCtx.user.role === 'admin') && children}
      </Grid.Row>
    </Grid>
  )
}

CountryPage.propTypes = {
  userCtx: PropTypes.object.isRequired
};

export default withUser(CountryPage);