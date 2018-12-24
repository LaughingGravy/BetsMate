import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import { Container } from 'semantic-ui-react'

import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay, renderForNotFound, NotFoundDisplay } from '../../../common/ConditionalRender'
import GET_STADIUM from '../../../../graphql/queries/administration/stadium/getStadium'
import StadiumForm from './StadiumForm'
import SaveStadiumButton from './SaveStadiumButton'

const vanillaContent = ({ data }) => {
  const isEdit = !(data.getStadium == null)

  let stadium = { id: "", name: "", city: "", countryId: "" }

  if (isEdit) {
    stadium.id = data.getStadium.id
    stadium.name = data.getStadium.name
    stadium.city = data.getStadium.city
    stadium.countryId = data.getStadium.countryId
  }

  return (
    <StadiumForm  {...stadium} render={renderProps => (
      <Container textAlign="center">
        <SaveStadiumButton variables={renderProps.variables} disabled={!renderProps.isFormValid} />
      </Container>
    )} />
  )
}

vanillaContent.propTypes = {
  data: PropTypes.object
};

const EnhancedContent = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay),
  renderForNotFound(NotFoundDisplay, "id", "getStadium")
)(vanillaContent)

const EditStadiumPageContent = ({ id }) => {
  return (
  <Query query={GET_STADIUM} variables={{ id }}>
    {EnhancedContent}
  </Query>
  )
}

EditStadiumPageContent.propTypes = {
  id: PropTypes.string
};

export default EditStadiumPageContent