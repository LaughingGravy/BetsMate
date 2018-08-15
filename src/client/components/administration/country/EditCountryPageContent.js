import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Container } from 'semantic-ui-react'

import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/country/getCountryByCode'
import CountryForm from './CountryForm'

const EditCountryPageContent = ({ code } ) => {
  const isEdit = !(code == null)

  return (
    <Query query={GET_COUNTRY_BY_CODE} variables={{ code }}>
      {({ loading, error, data }) => {

        if (loading) {
          return <Container textAlign="center">loading...</Container>
        }

        if (!error && !data) {
          return <Container textAlign="center">`Country with code ${code} not found`</Container>
        }

        let countryByCode = { code: "", name: "" }

        if (isEdit) {
          countryByCode.code = data.countryByCode.code
          countryByCode.name = data.countryByCode.name
        }

        return (
          <CountryForm  code={countryByCode.code} countryName={countryByCode.name}  />
        )
      }}
    </Query>
  )
}

EditCountryPageContent.propTypes = {
  userCtx: PropTypes.object
};

export default EditCountryPageContent