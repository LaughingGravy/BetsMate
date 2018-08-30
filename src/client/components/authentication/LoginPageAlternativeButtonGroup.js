import React from 'react'
import intl from 'react-intl-universal'
import { NavLink } from 'react-router-dom';
import { Grid, Container, GridColumn } from 'semantic-ui-react'

const LoginPageAlternativeButtonGroup = () => {
  return (
    <Container textAlign='center'>
      <Grid centered>
        <Grid.Row centered columns={2} divided>
          <GridColumn textAlign='right'>
            <NavLink to="/register" key="register">
              {intl.get("register-menu-header")}
            </NavLink>
          </GridColumn>
          <GridColumn textAlign='left'>
            <NavLink to="/reset" key="reset">
              {intl.get("reset-menu-header")}
            </NavLink>
          </GridColumn>
        </Grid.Row> 
      </Grid>
    </Container>  
  )
}

export default LoginPageAlternativeButtonGroup