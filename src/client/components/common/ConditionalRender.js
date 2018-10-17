import React from 'react'
import intl from 'react-intl-universal'
import { branch, renderComponent, renderNothing } from 'recompose';
import { Container, Button, Grid, Segment, Icon } from 'semantic-ui-react'

import GraphQLErrorDisplay from '../common/GraphQLErrorDisplay'

const renderForAdminFailAccessError = (component, propName = "userCtx") =>
  branch(
    props => (!props[propName] || !props[propName].isAuthenticated || props[propName].user.role != "admin"),
    renderComponent(component)
)

const renderIfAuthenticated = (component, propName = "userCtx", isAuthenticated = true) =>
branch(
  props => (props[propName] && isAuthenticated == props[propName].isAuthenticated),
            renderComponent(component),
            renderNothing
)

const renderOrIfAuthenticated = (component, altComponent, propName = "userCtx", isAuthenticated = true) =>
branch(
  props => (props[propName] && isAuthenticated == props[propName].isAuthenticated),
            renderComponent(component),
            renderComponent(altComponent)
)

const renderIfRole = (component, propName = "userCtx", role = "admin") =>
branch(
  props => (props[propName] && props[propName].isAuthenticated && role == props[propName].role),
            renderComponent(component),
            renderNothing
)

const renderOrIfRole = (component, altComponent, propName = "userCtx", role = "admin") =>
branch(
  props => (props[propName] && props[propName].isAuthenticated && role == props[propName].role),
            renderComponent(component),
            renderComponent(altComponent)
)

const renderOrIfPropArray = (component, altComponent, propName = "errors") =>
branch(
  props => (props[propName] && props[propName].length > 0),
            renderComponent(component),
            renderComponent(altComponent)
)

const renderForLoading = (component) => 
  branch(
    props => props.loading,
    renderComponent(component)
)

const LoadingDisplay = props => (
  <Container textAlign="center">{intl.get("loading")}</Container>
)

const VerifyingDisplay = props => (
  <Container textAlign="center"> 
    <Segment basic>
      <Icon name="sun outline" loading size="huge" />
    </Segment>
    <Segment basic size="huge">
      {intl.get("veryfying")}
    </Segment>
  </Container>
)

const renderForNotFound = (component, queryVariableName, dataName) => 
  branch(
    props => !props.loading && !props.error && props.variables[queryVariableName] && !props.data[dataName] ,
    renderComponent(component)
)

const renderForDataNotFound = (component, dataName) => 
  branch(
    props => !props.loading && (!props.error || !props.data[dataName]),
    renderComponent(component)

)

const hideIfNoData = (dataName)  =>
  branch(
    props => !props.loading && (!props.data  || !props.data[dataName]),
    renderNothing
)

const hideIfNoProp = (propName)  =>
  branch(
    props => !props.loading && !props[propName],
    renderNothing
)

const NotFoundDisplay = props => (
  <Container textAlign="center">{intl.get("not-found")}</Container>
)

const renderMessageForError = (component) => 
  branch(
    props =>  props.error,
              renderComponent(component),
              renderNothing
)

const renderForError = (component) =>
  branch (
    props => props.error,
             renderComponent(component)
)

const hideIfFailsPropsCheck = propsCheck =>
  branch(
    propsCheck,
    renderNothing
  )

const errorCheck = hideIfFailsPropsCheck(
  props => !props.error
)

const hideIfTestFails = (component, testFunc) =>
  branch(
    testFunc,
    renderComponent(component),
    renderNothing
)

const QueryErrorDisplay = props => (
  <Container textAlign="center">
    <GraphQLErrorDisplay error={props.error} />
    <Button primary onClick={props.refetch}>{intl.get("try-refetch-query")}</Button> 
  </Container>
)

const MutateErrorDisplay = props => (
  <Container textAlign="center">
    <GraphQLErrorDisplay error={props.error} />
  </Container>
)

export { renderForAdminFailAccessError, renderIfAuthenticated, renderIfRole, renderOrIfAuthenticated, renderOrIfRole,
        renderForLoading, renderMessageForError, renderForError, renderForNotFound, renderForDataNotFound,
        LoadingDisplay, QueryErrorDisplay, MutateErrorDisplay, NotFoundDisplay, hideIfTestFails, renderOrIfPropArray,
        errorCheck, VerifyingDisplay, hideIfNoData, hideIfNoProp}
