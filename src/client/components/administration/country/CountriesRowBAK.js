import React from 'react'
import { Table, Flag } from 'semantic-ui-react'

class CountriesRowBak extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this)
  }

  onClick = (e) => {
    const { data: { code }, onRowClick } = this.props
    onRowClick(code, e);
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

export default CountriesRowBak