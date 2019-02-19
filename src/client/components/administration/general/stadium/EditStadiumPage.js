import React from 'react'
import intl from 'react-intl-universal'

import { Grid, Container } from 'semantic-ui-react'
import EditStadiumPageContent from './EditStadiumPageContent'

const EditStadiumPage = ({ match } ) => {
  const stadiumId = match.params.stadiumId 
  const isEdit = !stadiumId

  console.log("isEdit", isEdit)

  return (
    <Container>
      <Grid columns={1} centered>
        <Grid.Row centered>
          {!isEdit && <h3>{intl.get("add-stadium-page-title")}</h3>}
          {isEdit && <h3>{intl.get("edit-stadium-page-title")}</h3>}
        </Grid.Row>

        <Grid.Row centered>
        <Grid.Column mobile={16} tablet={10} computer={8}> 
            <EditStadiumPageContent stadiumId={stadiumId} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>
  )
}

export default EditStadiumPage