import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Table } from 'semantic-ui-react'
import { compose } from 'recompose'

import ALL_STADIA from '../../../../graphql/queries/administration/stadium/allStadia'
import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay} from '../../../common/ConditionalRender'

import StadiaTableHeader from './StadiaTableHeader'
import StadiaTableFooter from './StadiaTableFooter'
import StadiaRow from './StadiaRow'
import { withSelectableRowsTable } from '../../../common/tableHocs/withSelectableRowsTable'
import { withTableSort } from '../../../common/tableHocs/withTableSort'

 const vanillaStadiaTable = ({ data: { stadia }, activeRows, onRowClick, onHeaderClick, sortColumn, sortDirection }) => {
  let stadiumId = 0;
  
  if (Object.entries(activeRows) && Object.entries(activeRows).some(e => e[1] == true))
    stadiumId = Object.entries(activeRows).shift()[0]

  return (
    <Table celled selectable striped sortable fixed style={{"margin": "auto"}}>
      
      <StadiaTableHeader onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} />

      <Table.Body>
        {
          stadia.map(s => {
          const isActive = activeRows[s.stadiumId]
          
          return(<StadiaRow active={isActive} 
                                key={s.stadiumId}
                                id={s.stadiumId}
                                data={s}
                                onRowClick={onRowClick}
                                />      
            )
          }
        )}
      </Table.Body>

      <StadiaTableFooter activeRows={activeRows} />
      
    </Table>
  )
}

vanillaStadiaTable.propTypes = {
  data: PropTypes.object,
  activeRows: PropTypes.object,
  onRowClick: PropTypes.func.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const EnhancedStadiaTable = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(withTableSort(withSelectableRowsTable(vanillaStadiaTable)))

const StadiaTable = () => {
  return (
    <Query query={ALL_STADIA}>
       {({ loading, error, data }) => { 
         return (
           <EnhancedStadiaTable data={data} loading={loading} error={error} /> 
         )
       }}
    </Query>
  )
}

export default StadiaTable