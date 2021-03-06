import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Message } from 'semantic-ui-react'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const VerifyEmailFailurePage = ({ message }) => {

  return (
    <Grid columns={1} centered>
    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Message size="big" negative
          icon={<SVG fill="orange" path={ICONS.WARNING.path} viewBox={ICONS.WARNING.viewBox} width="48" height="48" />}
          header={intl.get("verify-email-fail-header")}
          content={<span>{intl.getHTML("verify-email-fail-msg-content")}<br />{intl.getHTML(message)}</span>} />
      </GridColumn>
    </Grid.Row>
  </Grid>
  )
}

VerifyEmailFailurePage.propTypes = {
  message: PropTypes.string.isRequired
}

export default VerifyEmailFailurePage