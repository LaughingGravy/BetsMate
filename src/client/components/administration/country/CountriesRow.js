import React from 'react'
import { Table, Flag } from 'semantic-ui-react'
import { withRowSelection } from '../../common/withRowSelection'

class CountriesRow extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  flagRenderer = (code) => {
    return (<Flag name={code} />)
  }

  render() {
    const { data: { code, name }, active } = this.props
    
    return (
      <Table.Row textAlign='center' active={active} onClick={this.onClick}>
        <Table.Cell>{this.flagRenderer(code)}</Table.Cell>
        <Table.Cell>{code}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>     
      </Table.Row>
    )
  }
}

export default withRowSelection(CountriesRow)