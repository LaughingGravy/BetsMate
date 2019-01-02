import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../../library/routing'
import AdminTableButtonGroup from '../../controls/AdminTableButtonGroup'

import DELETE_STADIUM from '../../../../graphql/mutations/administration/stadium/deleteStadium'
import ALL_STADIA from '../../../../graphql/queries/administration/stadium/allStadia'

const StadiumTableButtonGroup = ({ activeRows }) => {

  const anySelectedRows = (data) => (Object.entries(data) && Object.entries(data).some(e => e[1] == true))

  const createNavigate = (e, data) => history.push('/administration/general/stadium/edit')

  const editNavigate = (e, data) => {
    if (!anySelectedRows(data))
        return
  
      const stadiumId = getId(data)
      history.push(`/administration/general/stadium/edit/${stadiumId}`)
  }

  const getId = (data) => {
    if (!anySelectedRows(data))
        return ""

    return Object.entries(data).shift()[0]
  }

  const stadiumId = getId(activeRows)

  return (
    <Mutation mutation={DELETE_STADIUM} 
              key={stadiumId} 

              refetchQueries={[ {query: ALL_STADIA} ]}> 
        {(deleteStadium, { loading, error }) => (
          <AdminTableButtonGroup variables={{stadiumId: stadiumId}} mutation={deleteStadium} loading={loading} error={error} 
                                createNavigate={createNavigate} 
                                editNavigate={editNavigate} 
                                activeRows={activeRows} />
      )}
    </Mutation>
  )
}

StadiumTableButtonGroup.propTypes = {
  activeRows: PropTypes.object.isRequired
};

export default StadiumTableButtonGroup