import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { compose } from 'recompose'
import { Container } from 'semantic-ui-react'

import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay, renderForNotFound, NotFoundDisplay } from '../../../common/ConditionalRender'
import GET_COUNTRY_BY_CODE from '../../../../graphql/queries/administration/country/getCountryByCode'
import CountryForm from './CountryForm'
import SaveCountryButton from './SaveCountryButton'

const vanillaContent = ({ data }) => {
  const isEdit = !(data.countryByCode == null)

  let countryByCode = { code: "", name: "" }

  if (isEdit) {
    countryByCode.code = data.countryByCode.code
    countryByCode.name = data.countryByCode.name
  }

  return (
    <CountryForm  code={countryByCode.code} countryName={countryByCode.name} render={renderProps => (
      <Container textAlign="center">
        <SaveCountryButton variables={renderProps.variables} disabled={!renderProps.isFormValid} />
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
  renderForNotFound(NotFoundDisplay, "code", "countryByCode")
)(vanillaContent)

const EditCountryPageContent = ({ code }) => {
  return (
  <Query query={GET_COUNTRY_BY_CODE} variables={{ code }}>
    {EnhancedContent}
  </Query>
  )
}

EditCountryPageContent.propTypes = {
  code: PropTypes.string
};

export default EditCountryPageContent