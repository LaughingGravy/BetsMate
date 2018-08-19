import React from 'react';
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Container } from 'semantic-ui-react'
import { compose } from 'recompose'

import { LoadingDisplay, renderForLoading } from '../../common/ConditionalRender'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/country/getCountryByCode'
import CountryForm from './CountryForm'

// const vanillaCountryPageContent = ({ code } ) => {
//   const isEdit = !(code == null)

//   return (
//     <Query query={GET_COUNTRY_BY_CODE} variables={{ code }}>
//       {({ loading, error, data }) => {

//         console.log("loading, error, data", loading, error, data)

//         // if (loading) {
//         //   return <Container textAlign="center">loading...</Container>
//         // }

//         if (!error && !data) {
//           return <Container textAlign="center">`Country with code ${code} not found`</Container>
//         }

//         let countryByCode = { code: "", name: "" }

//         if (isEdit) {
//           countryByCode.code = data.countryByCode.code
//           countryByCode.name = data.countryByCode.name
//         }

//         return (
//           <CountryForm  code={countryByCode.code} countryName={countryByCode.name}  />
//         )
//       }}
//     </Query>
//   )
// }

// vanillaCountryPageContent.propTypes = {
//   code: PropTypes.string
// };

// const EditCountryPageContent = compose(
//   renderForLoading(LoadingDisplay)
// )(vanillaCountryPageContent)

const vanillaContent = ({ loading, error, data }) => {
  const isEdit = !(data.countryByCode == null)

  console.log("loading, error, data", loading, error, data)

  if (loading) {
    return <Container textAlign="center">loading...</Container>
  }

  let countryByCode = { code: "", name: "" }

  if (isEdit) {
    countryByCode.code = data.countryByCode.code
    countryByCode.name = data.countryByCode.name
  }

  return (
    <CountryForm  code={countryByCode.code} countryName={countryByCode.name}  />
  )
}

// const Content = compose(
//   renderForLoading(LoadingDisplay)
// )(vanillaContent)

const EditCountryPageContent = ({ code }) => {
  return (
  <Query query={GET_COUNTRY_BY_CODE} variables={{ code }}>
    {vanillaContent}
  </Query>
  )
}

EditCountryPageContent.propTypes = {
  code: PropTypes.string
};

export default EditCountryPageContent