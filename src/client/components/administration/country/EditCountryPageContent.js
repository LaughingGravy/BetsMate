import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { compose } from 'recompose'

import { LoadingDisplay, renderForLoading, renderForError, ErrorDisplay, renderForNotFound, NotFoundDisplay } from '../../common/ConditionalRender'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/country/getCountryByCode'
import CountryForm from './CountryForm'

const vanillaContent = ({ loading, error, data, code }) => {
  const isEdit = !(data.countryByCode == null)

  let countryByCode = { code: "", name: "" }

  if (isEdit) {
    countryByCode.code = data.countryByCode.code
    countryByCode.name = data.countryByCode.name
  }

  return (
    <CountryForm  code={countryByCode.code} countryName={countryByCode.name}  />
  )
}

const EnhancedContent = compose(
  renderForLoading(LoadingDisplay),
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