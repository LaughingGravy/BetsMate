import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'

import { Grid, Container, GridColumn } from 'semantic-ui-react'
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
          <GridColumn mobile={16} tablet={8} computer={4}>

              <EditCountryPageContent code={code} />
     
          </GridColumn>
        </Grid.Row>

      </Grid>
    </Container>
  )
}

EditCountryPage.propTypes = {
  userCtx: PropTypes.object
};

export default EditCountryPage