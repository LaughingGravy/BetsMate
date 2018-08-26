import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Container, Button } from 'semantic-ui-react'

import { renderMessageForError } from '../../common/ConditionalRender'
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

const EnhancedGraphQLErrorDisplay = compose(
  renderMessageForError(GraphQLErrorDisplay)
)(GraphQLErrorDisplay)

const AdminDeleteButton = ({variables, mutation, loading, error }) => {
  return (
    <Container textAlign="center">
        <EnhancedGraphQLErrorDisplay error={error} />
        <Button secondary
                      onClick={e => { 
                                      e.preventDefault();
                                      mutation({variables})
                      }}
                      loading={loading}
                    >{intl.get("admin-delete-button-label")}
        </Button>  
    </Container>
  )
}

AdminDeleteButton.propTypes = {
  variables: PropTypes.object.isRequired,
  mutation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

export default AdminDeleteButton