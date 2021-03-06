import React from 'react'
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose';
import { Container, Button } from 'semantic-ui-react'

import GraphQLErrorDisplay from '../../common/controls/GraphQLErrorDisplay'
import { renderMessageForError } from '../../common/ConditionalRender'

const EnhancedGraphQLErrorDisplay = compose(
  renderMessageForError(GraphQLErrorDisplay)
)(GraphQLErrorDisplay)

const ButtonGroup = ({ activeRows, variables, mutation, loading, createNavigate }) => {
  const anySelectedRows = (Object.entries(activeRows) && Object.entries(activeRows).some(e => e[1] == true))

  return (
    <Button.Group>
      <Button secondary onClick={(e) => createNavigate(e, activeRows)}>{intl.get("admin-create-button-label")}</Button>
      <Button secondary disabled={!anySelectedRows} onClick={e => { 
                                                                    e.preventDefault();
                                                                    mutation({variables})
                                                                  }}
            loading={loading}>
          {intl.get("admin-delete-button-label")}
        </Button>  
    </Button.Group>
  )
}

ButtonGroup.propTypes = {
  activeRows: PropTypes.object.isRequired,
  variables: PropTypes.object.isRequired,
  mutation: PropTypes.func.isRequired,
  createNavigate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const AdminTableNoEditButtonGroup = ({ variables, mutation, loading, error, createNavigate, activeRows }) => {
  return (
    <Container textAlign="center">
      <EnhancedGraphQLErrorDisplay error={error} />
      <ButtonGroup  variables={variables} mutation={mutation} loading={loading} 
                    createNavigate={createNavigate} activeRows={activeRows} />
    </Container>
  )
}

AdminTableNoEditButtonGroup.propTypes = {
  activeRows: PropTypes.object.isRequired,
  variables: PropTypes.object.isRequired,
  mutation: PropTypes.func.isRequired,
  createNavigate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

export default AdminTableNoEditButtonGroup