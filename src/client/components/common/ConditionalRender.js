import React from 'react'
import intl from 'react-intl-universal'
import { branch, renderComponent } from 'recompose';
import { Container, Button } from 'semantic-ui-react'

import GraphQLErrorDisplay from '../common/GraphQLErrorDisplay'

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

const renderForError = branch(
  props => props.error,
  renderComponent(LoadingDisplay)
)

const ErrorDisplay = props => (
  <Container textAlign="center">
    <GraphQLErrorDisplay error={props.error} />
    <Button textAlign="center" onClick={props.refetch}>{intl.get("try-refetch-query")}</Button>
  </Container>
)

export { AdminFailAccessErrorDisplay, renderForAdminFailAccessError, renderForLoading, LoadingDisplay, renderForError, ErrorDisplay }
