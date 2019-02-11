import React from 'react'
import intl from 'react-intl-universal'
import { Grid, GridColumn, Header, Responsive, Container } from 'semantic-ui-react'

import LinkForm from '../LinkForm'
import SendResetPasswordButton from './SendResetPasswordButton'

import { SVG, ICONS } from '../../../../../static/svgHelper'

const SendPasswordResetPage = () => (
  <Grid columns={1} centered>
    <Grid.Row centered>
      <Header as='h3' icon>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <SVG path={ICONS.FIRSTAID.path} viewBox={ICONS.FIRSTAID.viewBox} width="48" height="48" />
        </Responsive>
        {intl.get("reset-page-title")}
        <Header.Subheader>{intl.getHTML("reset-text")}</Header.Subheader>
      </Header>
    </Grid.Row>

    <Grid.Row centered>
      <GridColumn mobile={14} tablet={8} computer={6}>
        <Container textAlign='center'>
          <LinkForm render={props => (
            <SendResetPasswordButton variables={props.variables} disabled={!props.isFormValid} /> 
          )}/>
        </Container>
      </GridColumn>
    </Grid.Row>

  </Grid>
)

export default SendPasswordResetPage