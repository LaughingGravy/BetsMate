import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import AdminTableButtonGroup from '../controls/AdminTableButtonGroup'

import DELETE_COUNTRY from '../../../graphql/mutations/administration/country/deleteCountry'
import ALL_COUNTRIES from '../../../graphql/queries/administration/country/allCountries'

class CountryTableButtonGroup extends React.PureComponent {
  constructor(props) {
    super(props)

    this.createNavigate = this.createNavigate.bind(this)
    this.editNavigate = this.editNavigate.bind(this)
    this.getCode = this.getCode.bind(this)
  }

  createNavigate = (e, data) => history.push('/administration/country/editcountry')

  editNavigate = (e, data) => {
    if (!Object.entries(data) || Object.entries(data).length === 0)
        return
  
      const code = getCode(data)
      history.push(`/administration/country/editcountry/${code}`)
  }

  getCode = (data) => {
    return Object.entries(data).shift()[0]
  }

  render() {
    const { activeRows } = this.props
    const code = this.getCode(activeRows)

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
}

CountryTableButtonGroup.propTypes = {
  activeRows: PropTypes.array.isRequired
};

export default CountryTableButtonGroup