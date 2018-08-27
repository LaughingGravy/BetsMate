import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import AdminTableButtonGroup from '../controls/AdminTableButtonGroup'
import DELETE_COUNTRY from '../../../graphql/mutations/administration/country/deleteCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'

const CountryTableButtonGroup = ({ code, anySelectedRows, createNavigate, editNavigate }) => {
  return (
    <Mutation mutation={DELETE_COUNTRY} 
              key={code} 

              refetchQueries={[ {query: ALL_COUNTRIES} ]}> 
        {(deleteCountry, { loading, error }) => (
          <AdminTableButtonGroup variables={{code: code}} mutation={deleteCountry} loading={loading} error={error} 
                                 createNavigate={createNavigate} 
                                 editNavigate={editNavigate} 
                                 anySelectedRows={anySelectedRows} />
      )}
    </Mutation>
  )
}

CountryTableButtonGroup.propTypes = {
  code: PropTypes.string.isRequired,
  anySelectedRows: PropTypes.bool.isRequired,
  createNavigate: PropTypes.func.isRequired,
  editNavigate: PropTypes.func.isRequired
};

export default CountryTableButtonGroup