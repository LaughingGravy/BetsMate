import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../../library/routing'
import AdminTableButtonGroup from '../../controls/AdminTableButtonGroup'

import DELETE_COUNTRY from '../../../../graphql/mutations/administration/country/deleteCountry'
import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'

const CountryTableButtonGroup = ({ activeRows }) => {

  const anySelectedRows = (data) => (Object.entries(data) && Object.entries(data).some(e => e[1] == true))

  const createNavigate = (e, data) => history.push('/administration/general/country/edit')

  const editNavigate = (e, data) => {
    if (!anySelectedRows(data))
        return
  
      const code = getCode(data)
      history.push(`/administration/general/country/edit/${code}`)
  }

  const getCode = (data) => {
    if (!anySelectedRows(data))
        return ""

    return Object.entries(data).shift()[0]
  }

  const code = getCode(activeRows)

  return (
    <Mutation mutation={DELETE_COUNTRY} 
              key={code} 

              refetchQueries={[ {query: ALL_COUNTRIES} ]}> 
        {(deleteCountry, { loading, error }) => (
          <AdminTableButtonGroup variables={{code: code}} mutation={deleteCountry} loading={loading} error={error} 
                                createNavigate={createNavigate} 
                                editNavigate={editNavigate} 
                                activeRows={activeRows} />
      )}
    </Mutation>
  )
}

CountryTableButtonGroup.propTypes = {
  activeRows: PropTypes.object.isRequired
};

export default CountryTableButtonGroup