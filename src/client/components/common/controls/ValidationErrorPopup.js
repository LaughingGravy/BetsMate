import React from 'react'
import PropTypes from 'prop-types'
import { Popup } from 'semantic-ui-react'

import { ICONS, SVG } from '../../../../../static/svgHelper'

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
        trigger={<div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}><SVG width="22" height="22" fill="red" path={ICONS.INFO.path} viewBox={ICONS.INFO.viewBox} style={this.props.style} title="Information" /></div>}
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