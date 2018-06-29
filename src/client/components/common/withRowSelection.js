import React from 'react'

export function withRowSelection(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this)
    }

    onClick = (e) => {
      const { id , onRowClick } = this.props
      onRowClick(id, e);
    }

    render() {
      return <WrappedComponent onClick={this.onClick} {...this.props} />
    }
  }
}