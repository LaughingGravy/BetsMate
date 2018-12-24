import React from 'react'
import PropTypes from 'prop-types'
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

CountriesTableFooter.propTypes = {
  activeRows: PropTypes.object.isRequired
};

export default CountriesTableFooter