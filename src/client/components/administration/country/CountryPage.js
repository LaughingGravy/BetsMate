import React from 'react';
import { Grid } from 'semantic-ui-react'

const CountryPage = ({ children }) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        {children}
      </Grid.Row>
    </Grid>
  )
}

export default CountryPage;