import React from 'react'
import { Table } from 'semantic-ui-react'
import intl from 'react-intl-universal'

const StadiaTableHeader = ({ onHeaderClick, sortColumn, sortDirection }) => {
  return (
    <Table.Header>
      <Table.Row textAlign='center'>
        <Table.HeaderCell sorted={sortColumn === "name" ? sortDirection : null} onClick={onHeaderClick("name")}>{intl.get("stadium-tbl-name-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell sorted={sortColumn === "city" ? sortDirection : null} onClick={onHeaderClick("city")}>{intl.get("stadium-tbl-city-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell sorted={sortColumn === "country.name" ? sortDirection : null} onClick={onHeaderClick("country.name")}>{intl.get("stadium-tbl-country-col-hdr")}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

export default StadiaTableHeader