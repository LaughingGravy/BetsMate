import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import StadiumTableButtonGroup from './StadiumTableButtonGroup'

const StadiaTableFooter = ({ activeRows }) => {
  return (
    <Table.Footer>
      <Table.Row textAlign='center'>
        <Table.Cell colSpan='3' textAlign="center">
            <StadiumTableButtonGroup activeRows={activeRows} />
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  )
}

StadiaTableFooter.propTypes = {
  activeRows: PropTypes.object.isRequired
};

export default StadiaTableFooter