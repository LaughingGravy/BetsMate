import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'recompose'

import { Grid } from 'semantic-ui-react'
import intl from 'react-intl-universal';

import { renderIfAuthenticated } from '../../common/ConditionalRender'
import { withUser } from '../../contexts/withUserContext'

const vanillaUnAuthItemsGridRow = ({ onToggleSideBarVisibility }) => (
  <Grid.Row columns={2}>
    <Grid.Column textAlign="right">
        <Link to="/register/link" key="registerlink" onClick={onToggleSideBarVisibility}>
          {intl.get("register-menu-header")}
        </Link>
      </Grid.Column>
      <Grid.Column textAlign="left">
        <Link to="/login" key="login" onClick={onToggleSideBarVisibility}>
          {intl.get("login-menu-header")}
        </Link>
    </Grid.Column>
  </Grid.Row>
)

const UnAuthItemsGridRow = compose(
  renderIfAuthenticated(vanillaUnAuthItemsGridRow, "userCtx", false)
)(vanillaUnAuthItemsGridRow)

UnAuthItemsGridRow.propTypes = {
  userCtx: PropTypes.object.isRequired,
  onToggleSideBarVisibility: PropTypes.func.isRequired
}

export default withUser(UnAuthItemsGridRow)