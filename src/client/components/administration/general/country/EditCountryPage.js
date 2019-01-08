import React from 'react'
import intl from 'react-intl-universal'

import { Grid, Container } from 'semantic-ui-react'
import EditCountryPageContent from './EditCountryPageContent'

const EditCountryPage = ({ match } ) => {
  const code = match.params.code 
  const isEdit = !(match.params.code == null)

  return (
    <Container>
      <Grid columns={1} centered>
        <Grid.Row centered>
          {!isEdit && <h3>{intl.get("add-country-page-title")}</h3>}
          {isEdit && <h3>{intl.get("edit-country-page-title")}</h3>}
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column mobile={16} tablet={10} computer={8}> 
            <EditCountryPageContent code={code} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
  )
}

export default EditCountryPage