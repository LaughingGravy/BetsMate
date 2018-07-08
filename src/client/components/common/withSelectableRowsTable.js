import React from 'react'

export function withSelectableRowsTable(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        activeRows: []
      }

      this.onRowClick = this.onRowClick.bind(this);
    }

    onRowClick(e, id) {
      const { activeRows } = this.state

      e.preventDefault()

      const nextRows = {
        ...activeRows,
        [id]: !activeRows[id]
      }
  
      this.setState({
        activeRows: nextRows
      })
    }

    render() {
      const { activeRows } = this.state

      return (
        <WrappedComponent {...this.props} activeRows={activeRows} onRowClick={this.onRowClick} />
      )
    }
  }
}