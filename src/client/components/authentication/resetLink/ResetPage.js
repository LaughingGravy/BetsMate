import React from 'react'
import intl from 'react-intl-universal'
import { Grid } from 'semantic-ui-react'

import ResetPageContent from './ResetPageContent'

const ResetPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <h3>{intl.get("reset-page-title")}</h3>
    </Grid.Row>

    <ResetPageContent />

  </Grid>
)

export default ResetPage