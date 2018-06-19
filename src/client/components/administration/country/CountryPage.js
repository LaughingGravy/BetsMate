import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import intl from 'react-intl-universal';
import { Grid, Menu } from 'semantic-ui-react'

import { withUser } from '../../contexts/withUserContext'
import CountryRoutes from './CountryRoutes'

const CountryPage = ({ match, userCtx }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
      {(userCtx.user.role == 'admin') && <Menu stackable pointing secondary>

            <Menu.Item as={NavLink} to={`${match.url}/countries`} key="countries" activeClassName="active">
              {intl.get("countries-menu-header")}
            </Menu.Item>

            <Menu.Item as={NavLink} to={`${match.url}/createcountry`} key="createcountry" activeClassName="active">
              {intl.get("add-country-menu-header")}
            </Menu.Item>

          </Menu>}
      </Grid.Row>

      <Grid.Row centered>
        <CountryRoutes match={match} />
      </Grid.Row>
    </Grid>
  )
}

CountryPage.propTypes = {
  match: PropTypes.object.isRequired,
  userCtx: PropTypes.object
};

export default withUser(CountryPage);