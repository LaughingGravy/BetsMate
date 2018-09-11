import React from 'react';
import intl from 'react-intl-universal'
import { Grid } from 'semantic-ui-react'

import RegistrationPageContent from './RegistrationPageContent'

const RegistrationPage = ({match}) => {
  const { token } = match.params

  return (   
    <Grid columns={1} centered>
      <Grid.Row centered>
      <h3>{intl.get("register-page-title")}</h3>
      </Grid.Row>

      <RegistrationPageContent token={token} />

    </Grid>      
  )
}
  
  export default RegistrationPage;