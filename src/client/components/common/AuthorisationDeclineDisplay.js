import React from 'react'
import intl from 'react-intl-universal'
import { branch, renderComponent } from 'recompose';
import { Container } from 'semantic-ui-react'

import { withUser } from '../contexts/withUserContext'

export function renderForAuthDecline(component, propName = "userCtx") {
  return branch(
    props => props[propName] && (!props[propName].isAuthenticated || !props[propName].user.role != "admin"),
    renderComponent(component)
  )
}

const AuthorisationDeclineDisplay = props =>(
  <Container textAlign="center">{intl.get("auth-page-decline")}</Container>
)

export default withUser(AuthorisationDeclineDisplay)
