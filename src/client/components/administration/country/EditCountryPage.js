import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Grid, Container, GridColumn } from 'semantic-ui-react'

import EditCountryPageContent from './EditCountryPageContent'
import { AuthorisationDeclineDisplay, renderForAuthDecline } from '../../common/AuthorisationDeclineDisplay';

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

export default compose(
  renderForAuthDecline(AuthorisationDeclineDisplay, "userCtx")
)(EditCountryPage)