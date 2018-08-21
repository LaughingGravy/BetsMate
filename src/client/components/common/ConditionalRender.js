import React from 'react'
import intl from 'react-intl-universal'
import { branch, renderComponent, renderNothing } from 'recompose';
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

const renderForLoading = (component) => 
  branch(
    props => props.loading,
    renderComponent(component)
)

const LoadingDisplay = props => (
  <Container textAlign="center">{intl.get("loading")}</Container>
)

const renderForNotFound = (component, queryVariableName, dataName, ) => 
  branch(
    props => !props.loading && !props.error && props.variables[queryVariableName] && !props.data[dataName] ,
    renderComponent(component)
)

const NotFoundDisplay = props => (
  <Container textAlign="center">{intl.get("not-found")}</Container>
)

const renderForError = (component) => 
  branch(
    props => props.error,
          renderComponent(component),
          renderNothing
)

const hideIfFailsPropsCheck = propsCheck =>
  branch(
    propsCheck,
    renderNothing
  )

const errorCheck = hideIfFailsPropsCheck(
  props => !props.error
)

const QueryErrorDisplay = props => (
  <Container textAlign="center">
    <GraphQLErrorDisplay error={props.error} />
    <Button tertiary onClick={props.refetch}>{intl.get("try-refetch-query")}</Button> 
  </Container>
)

const MutateErrorDisplay = props => (
  <Container textAlign="center">
    <GraphQLErrorDisplay error={props.error} />
  </Container>
)

export { AdminFailAccessErrorDisplay, renderForAdminFailAccessError, 
        renderForLoading, LoadingDisplay, renderForError, QueryErrorDisplay, MutateErrorDisplay,
        renderForNotFound, NotFoundDisplay, errorCheck }
