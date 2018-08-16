import React from 'react'
import intl from 'react-intl-universal'
import { branch, renderComponent } from 'recompose';
import { Container } from 'semantic-ui-react'

const renderForAdminFail = (component, propName = "userCtx") =>
  branch(
    props => (!props[propName] || !props[propName].isAuthenticated || props[propName].user.role != "admin"),
    renderComponent(component)
  )

const AdminFailDisplay = props => (
  <Container textAlign="center">{intl.get("auth-page-decline")}</Container>
)

export { AdminFailDisplay, renderForAdminFail }
