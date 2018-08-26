import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import AdminDeleteButton from '../controls/AdminDeleteButton'
import DELETE_COUNTRY from '../../../graphql/mutations/administration/country/deleteCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'

const DeleteCountryButton = ({ code }) => {
  return (
    <Mutation mutation={DELETE_COUNTRY} 
              key={code} 

    refetchQueries={[ {query: ALL_COUNTRIES} ]}> 
    {(deleteCountry, { loading, error }) => (
      <AdminDeleteButton variables={{code: code }} mutation={deleteCountry} loading={loading} error={error} />
     )}
     </Mutation>
   )
 }

DeleteCountryButton.propTypes = {
  code: PropTypes.string.isRequired
};

export default DeleteCountryButton