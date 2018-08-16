import React from 'react'
import intl from 'react-intl-universal'
import { branch, renderComponent } from 'recompose';
import { Container } from 'semantic-ui-react'

const renderForAdminFailAccessError = (component, propName = "userCtx") =>
  branch(
    props => (!props[propName] || !props[propName].isAuthenticated || props[propName].user.role != "admin"),
    renderComponent(component)
)

const AdminFailAccessErrorDisplay = props => (
  <Container textAlign="center">{intl.get("auth-page-decline")}</Container>
)

const renderForLoading = branch(
    props => props.loading,
    renderComponent(LoadingDisplay)
)

const LoadingDisplay = props => (
  <Container textAlign="center">{intl.get("loading")}</Container>
)

export { AdminFailAccessErrorDisplay, renderForAdminFailAccessError, renderForLoading, LoadingDisplay }
