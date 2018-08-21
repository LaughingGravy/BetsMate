import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import AdminSaveButton from '../controls/AdminSaveButton'
import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/country/getCountryByCode'
import MERGE_COUNTRY from '../../../graphql/mutations/administration/country/mergeCountry'

// const SaveCountryButton = ({ code, name, onCompleted }) => {
//   return (
//     <Mutation mutation={MERGE_COUNTRY} key={code}
      
//       onCompleted={onCompleted}

//       update={(store, { data: mergeCountry }) => {
//         const data = store.readQuery({
//           query: GET_COUNTRY_BY_CODE, 
//           variables: {
//             code: code
//           }
//         })

//         const { countryByCode } = data
//         countryByCode.code = code
//         countryByCode.name = name
        
//         store.writeQuery({
//           query: GET_COUNTRY_BY_CODE, 
//           variables: {
//             code: code
//           },
//           data: {countryByCode: countryByCode}
//         })
//       }}

//       refetchQueries={[ {query: ALL_COUNTRIES} ]}>
//       {(mergeCountry, { loading, error }) => (

//         <Container textAlign='center'>
//           <Form.Button primary
//                         onClick={e => { 
//                                         e.preventDefault();
//                                         mergeCountry({ variables: { code, name }} )
//                         }}
//                         loading={loading} 
//                       >{intl.get("save-button-label")}
//           </Form.Button>

//           {error && <GraphQLErrorDisplay error={error} />}
//         </Container>
//       )}
//     </Mutation>
//   )
// }

// SaveCountryButton.propTypes = {
//   code: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   onCompleted: PropTypes.func.isRequired
// };

// export default SaveCountryButton



// const vanillaSaveCountryButton = ({mutation, loading, code, name, error}) => {

//   console.log("code, name, mergeCountry, loading, error", code, name, loading, error)

//   return (
//     <Container textAlign='center'>
//       <EnhancedGraphQLErrorDisplay error={error} />
//       <Form.Button primary
//                     onClick={e => { 
//                                     e.preventDefault();
//                                     mutation({ variables: { code, name }})
//                     }}
//                     loading={loading} 
//                   >{intl.get("save-button-label")}
//       </Form.Button>   
//     </Container>
//   )
// }

// vanillaSaveCountryButton.propTypes = {
//   code: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   loading: PropTypes.bool.isRequired,
//   error: PropTypes.object,
//   mergeCountry: PropTypes.func.isRequired
// };

const SaveCountryButton = ({ code, name, onCompleted }) => {
  return (
    <Mutation mutation={MERGE_COUNTRY} key={code} 
      
      onCompleted={onCompleted}

      update={(store, { data: mergeCountry }) => {
        const data = store.readQuery({
          query: GET_COUNTRY_BY_CODE, 
          variables: {
            code: code
          }
        })

        const { countryByCode } = data
        countryByCode.code = code
        countryByCode.name = name
        
        store.writeQuery({
          query: GET_COUNTRY_BY_CODE, 
          variables: {
            code: code
          },
          data: {countryByCode: countryByCode}
        })
      }}

      refetchQueries={[ {query: ALL_COUNTRIES} ]}>
      {(mergeCountry, { loading, error }) => (
          <AdminSaveButton variables={{code: code, name: name}} mutation={mergeCountry} loading={loading} error={error} />
      )}
    </Mutation>
  )
}

SaveCountryButton.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCompleted: PropTypes.func.isRequired
};

export default SaveCountryButton