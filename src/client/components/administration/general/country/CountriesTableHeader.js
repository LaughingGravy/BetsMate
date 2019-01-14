import React from 'react'
import { Table } from 'semantic-ui-react'
import intl from 'react-intl-universal'

const CountriesTableHeader = ({ onHeaderClick, sortColumn, sortDirection }) => {
  return (
    <Table.Header>
      <Table.Row textAlign='center'>
        <Table.HeaderCell>{intl.get("country-tbl-flag-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell sorted={sortColumn === "code" ? sortDirection : null} onClick={onHeaderClick("code")}>{intl.get("country-tbl-code-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell sorted={sortColumn === "name" ? sortDirection : null} onClick={onHeaderClick("name")}>{intl.get("country-tbl-name-col-hdr")}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

export default CountriesTableHeader