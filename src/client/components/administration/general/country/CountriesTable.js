import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Table } from 'semantic-ui-react'
import { compose } from 'recompose'

import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'
import COUNTRIES_BY_NAME from '../../../../graphql/queries/administration/country/getCountriesByName'
import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay} from '../../../common/ConditionalRender'

import CountriesTableHeader from './CountriesTableHeader'
import CountriesTableFooter from './CountriesTableFooter'
import CountriesRow from './CountriesRow'
import { withSelectableRowsTable } from '../../../common/tableHocs/withSelectableRowsTable'
import { withTableSort } from '../../../common/tableHocs/withTableSort'

 const vanillaCountriesTable = ({ data: { countries }, activeRows, onRowClick, onHeaderClick, sortColumn, sortDirection }) => {
  let code = ""
  if (Object.entries(activeRows) && Object.entries(activeRows).some(e => e[1] == true))
    code = Object.entries(activeRows).shift()[0]

  return (
    <Table celled selectable striped sortable fixed style={{"margin": "auto"}}>

      <CountriesTableHeader onHeaderClick={onHeaderClick} sortColumn={sortColumn} sortDirection={sortDirection} /> 

      <Table.Body>
        {
          countries.map(c => {
          const isActive = activeRows[c.code]
          
          return(<CountriesRow active={isActive} 
                                key={c.code}
                                id={c.code}
                                data={c}
                                onRowClick={onRowClick}
                                />      
            )
          }
        )}
      </Table.Body>

      <CountriesTableFooter activeRows={activeRows} />
    </Table>
  )
}

vanillaCountriesTable.propTypes = {
  data: PropTypes.object,
  activeRows: PropTypes.object,
  onRowClick: PropTypes.func.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  sortColumn: PropTypes.string,
  sortDirection: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

const EnhancedCountriesTable = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(withTableSort(withSelectableRowsTable(vanillaCountriesTable)))

// const CountriesTable = () => {
//   return (
//     <Query query={ALL_COUNTRIES}>
//        {({ loading, error, data }) => { 
//          return (
//            <EnhancedCountriesTable data={data} loading={loading} error={error} /> 
//          )
//        }}
//     </Query>
//   )
// }


const CountriesTable = ({variables}) => {
  return (
    <Query query={COUNTRIES_BY_NAME} variables={variables} fetchPolicy="cache-and-network">
       {({ loading, error, data, fetchMore }) => { 
         return (
           <EnhancedCountriesTable data={data} loading={loading} error={error} /> 
         )
       }}
    </Query>
  )
}

export default CountriesTable