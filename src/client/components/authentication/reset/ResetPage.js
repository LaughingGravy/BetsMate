import React from 'react'
import intl from 'react-intl-universal'
import { Form } from 'semantic-ui-react'

const ResetPage = () => (
  <Container>
  <Grid columns={1} centered>
    <Grid.Row centered>
      <h3>{intl.get("reset-page-title")}</h3>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Container textAlign='center'>
          <RestForm render={variables => (
            <ResetButton variables={variables} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>

  </Grid>
</Container>
)

export default ResetPage

  
export default ResetPage