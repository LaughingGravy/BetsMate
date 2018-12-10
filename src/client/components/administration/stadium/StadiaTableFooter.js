import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

import StadiaTableButtonGroup from './StadiaTableButtonGroup'

const StadiaTableFooter = ({ activeRows }) => {
  return (
    <Table.Footer>
      <Table.Row textAlign='center'>
        <Table.Cell colSpan='3' textAlign="center">
            <StadiaTableButtonGroup activeRows={activeRows} />
        </Table.Cell>
      </Table.Row>
    </Table.Footer>
  )
}

StadiaTableFooter.propTypes = {
  activeRows: PropTypes.object.isRequired
};

export default StadiaTableFooter