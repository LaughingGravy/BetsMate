import React from 'react';
import { withUser } from '../../contexts/withUserContext'
import CountryRoutes from './CountryRoutes'

const CountryPage = ({ userCtx }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
      {(userCtx.user.role == 'admin') && <Menu stackable secondary>

            <Menu.Item as={NavLink} to="/countries" key="countries" activeClassName="active">
              {intl.get("countries-menu-header")}
            </Menu.Item>

            <Menu.Item as={NavLink} to="/createcountry" key="countries" activeClassName="active">
              {intl.get("add-country-menu-header")}
            </Menu.Item>

          </Menu>}
      </Grid.Row>

      <Grid.Row centered>
        <CountryRoutes />
      </Grid.Row>
    </Grid>
  )
}

export default withUser(CountryPage);