import React from 'react'
import intl from 'react-intl-universal'

import { Grid, Container, GridColumn } from 'semantic-ui-react'
import EditStadiumPageContent from './EditStadiumPageContent'

const EditStadiumPage = ({ match } ) => {
  const stadiumId = match.params.stadiumId 
  const isEdit = !(match.params.stadiumId == null)

  return (
    <Container>
      <Grid columns={1} centered>
        <Grid.Row centered>
          {!isEdit && <h3>{intl.get("add-stadium-page-title")}</h3>}
          {isEdit && <h3>{intl.get("edit-stadium-page-title")}</h3>}
        </Grid.Row>

        <Grid.Row centered>
          <GridColumn mobile={16} tablet={8} computer={4}>
            <EditStadiumPageContent stadiumId={stadiumId} />
          </GridColumn>
        </Grid.Row>

      </Grid>
    </Container>
  )
}

export default EditStadiumPage