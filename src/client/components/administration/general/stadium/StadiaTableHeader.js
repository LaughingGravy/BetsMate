import React from 'react'
import { Table } from 'semantic-ui-react'
import intl from 'react-intl-universal'

const StadiaTableHeader = () => {
  return (
    <Table.Header>
      <Table.Row textAlign='center'>
        <Table.HeaderCell>{intl.get("stadium-tbl-name-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell>{intl.get("stadium-tbl-city-col-hdr")}</Table.HeaderCell>
        <Table.HeaderCell>{intl.get("stadium-tbl-country-col-hdr")}</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

export default StadiaTableHeader