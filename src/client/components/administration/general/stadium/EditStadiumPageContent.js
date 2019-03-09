import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import { Container } from 'semantic-ui-react'

import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay, renderForNotFound, NotFoundDisplay } from '../../../common/ConditionalRender'
import STADIUM_BY_ID from '../../../../graphql/queries/administration/stadium/getStadiumById'
import StadiumForm from './StadiumForm'
import SaveStadiumButton from './SaveStadiumButton'

const vanillaContent = ({ data }) => {
  const isEdit = !(data.stadiumById == null)

  let stadium = { stadiumId: "", name: "", city: "", country: {code: "", name: ""} }

  if (isEdit) {
    stadium.stadiumId = data.stadiumById.stadiumId
    stadium.name = data.stadiumById.name
    stadium.city = data.stadiumById.city
    stadium.country = data.stadiumById.country
  }

  return (
    <StadiumForm  {...stadium} render={renderProps => (
      <Container textAlign="center">
        <SaveStadiumButton variables={renderProps.variables} isEdit={isEdit} disabled={!renderProps.isFormValid} />
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
  renderForNotFound(NotFoundDisplay, "stadiumId", "stadiumById")
)(vanillaContent)


const EditStadiumPageContent = ({ stadiumId }) => {
  return (
  <Query query={STADIUM_BY_ID} variables={{ stadiumId }}>
    {EnhancedContent}
  </Query>
  )
}

EditStadiumPageContent.propTypes = {
  stadiumId: PropTypes.string
};

export default EditStadiumPageContent