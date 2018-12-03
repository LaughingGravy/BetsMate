import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { Grid } from 'semantic-ui-react'
import intl from 'react-intl-universal'

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

const vanillaAuthItemsGridRow = ({ onToggleSideBarVisibility }) => (
  <Grid.Row centered columns={1}>
    <Grid.Column textAlign="center">
        <Link to="/change-password" key="change-password" onClick={onToggleSideBarVisibility}>
          {intl.get("change-password-menu-header")}
        </Link>
      </Grid.Column>
  </Grid.Row>
)

const AuthItemsGridRow = compose(
  renderIfAuthenticated(vanillaAuthItemsGridRow)
)(vanillaAuthItemsGridRow)

AuthItemsGridRow.propTypes = {
  userCtx: PropTypes.object.isRequired,
  onToggleSideBarVisibility: PropTypes.func.isRequired
}

export default withUser(AuthItemsGridRow)