import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Popup } from 'semantic-ui-react'

class ValidationErrorPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpen: false }
  }

  handleMouseOver = () => {
    this.setState({ isOpen: true })
  }

  handleMouseOut = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { message } = this.props
    return (
      <Popup
        trigger={<Icon link name="info" color="red" size="small" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} />}
        position="right center" on="hover">
        <Popup.Content>
          {message}
        </Popup.Content>
      </Popup>
    )
  }
}

ValidationErrorPopup.propTypes ={
  message: PropTypes.string.isRequired
}

export default ValidationErrorPopup