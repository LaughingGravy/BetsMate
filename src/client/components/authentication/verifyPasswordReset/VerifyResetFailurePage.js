import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const VerifyResetFailurePage = ({message}) => {
  return (
    <Grid columns={1} centered>
      <Grid.Row centered>
        <GridColumn mobile={14} tablet={8} computer={6}>
          <Message size="big" negative
            icon={<SVG fill="red" path={ICONS.SEND.path} viewBox={ICONS.SEND.viewBox} width="48" height="48" />}
            header={intl.get("verify-reset-fail-header")}
            content={<span>{intl.getHTML("verify-reset-fail-msg-content")}<br />{intl.getHTML(message)}</span>} />
        </GridColumn>
      </Grid.Row>
    </Grid>
  )
}

VerifyResetFailurePage.propTypes = {
  message: PropTypes.string.isRequired
}

// const notVerifiedAndMessageToDisplay = hideIfTestFails(VerifyResetFailurePage, 
//           props => !props.error && !props.verified && props.message
// )

// const VerifyResetFailurePage = compose(
//   notVerifiedAndMessageToDisplay(vanillaVerifyResetFailurePage)
// )(vanillaVerifyResetFailurePage)

export default VerifyResetFailurePage