import React from 'react'
import { Table } from 'semantic-ui-react'

import CountryTableButtonGroup from './CountryTableButtonGroup'

const CountriesTableFooter = ({ activeRows }) => {
  return (
    <Table.Footer>
      <Table.Row textAlign='center'>
        <Table.Cell colSpan='3' textAlign="center">
            <CountryTableButtonGroup activeRows={activeRows} />
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  )
}

DeleteCountryButton.propTypes = {
  activeRows: PropTypes.array.isRequired,
};

export default CountriesTableFooter