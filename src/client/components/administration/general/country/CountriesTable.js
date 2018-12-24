import React from 'react'
import { Query } from 'react-apollo'
import { Table } from 'semantic-ui-react'
import { compose } from 'recompose'

import ALL_COUNTRIES from '../../../../graphql/queries/administration/country/allCountries'
import { LoadingDisplay, renderForLoading, renderForError, QueryErrorDisplay} from '../../../common/ConditionalRender'

import CountriesTableHeader from './CountriesTableHeader'
import CountriesTableFooter from './CountriesTableFooter'
import CountriesRow from './CountriesRow'
import { withSelectableRowsTable } from '../../../common/withSelectableRowsTable'

 const vanillaCountriesTable = ({ data: { countries }, activeRows, onRowClick }) => {
  let code = ""
  if (Object.entries(activeRows) && Object.entries(activeRows).some(e => e[1] == true))
    code = Object.entries(activeRows).shift()[0]

  return (
    <Table celled selectable stackable>
      
      <CountriesTableHeader />

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

const EnhancedCountriesTable = compose(
  renderForLoading(LoadingDisplay),
  renderForError(QueryErrorDisplay)
)(withSelectableRowsTable(vanillaCountriesTable))

const CountriesTable = () => {
  return (
    <Query query={ALL_COUNTRIES}>
       {({ loading, error, data }) => { 
         return (
           <EnhancedCountriesTable data={data} loading={loading} error={error} /> 
         )
       }}
    </Query>
  )
}

export default CountriesTable