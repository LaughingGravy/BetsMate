import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Grid, Container, GridColumn } from 'semantic-ui-react'

import { withUser } from '../../contexts/withUserContext'
import EditCountryPageContent from './EditCountryPageContent'

const EditCountryPage = ({ userCtx, match } ) => {
  const code = match.params.code  

  return (
    <Container>
      <Grid columns={1} centered>
        <Grid.Row centered>
          <h3>{intl.get("add-country-page-title")}</h3>
        </Grid.Row>

        <Grid.Row centered>
          <GridColumn mobile={16} tablet={8} computer={4}>

               {(!userCtx.isAuthenticated || userCtx.user.role != 'admin') &&
               <Container textAlign="center">You are not authorised to view this page.</Container>}

               {(userCtx.isAuthenticated && userCtx.user.role == 'admin') && 
              <EditCountryPageContent code={code} />}
     
          </GridColumn>
        </Grid.Row>

      </Grid>
    </Container>
  )
}

EditCountryPage.propTypes = {
  userCtx: PropTypes.object
};

export default withUser(EditCountryPage)