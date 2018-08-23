import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Container, Segment, Form } from 'semantic-ui-react'

import { renderMessageForError } from '../../common/ConditionalRender'
import GraphQLErrorDisplay from '../../common/GraphQLErrorDisplay'

const EnhancedGraphQLErrorDisplay = compose(
  renderMessageForError(GraphQLErrorDisplay)
)(GraphQLErrorDisplay)

const AdminSaveButton = ({variables, mutation, loading, error}) => {

  return (
    <Container textAlign="center">
        <EnhancedGraphQLErrorDisplay error={error} />
        <Form.Button primary
                      onClick={e => { 
                                      e.preventDefault();
                                      mutation({variables})
                      }}
                      loading={loading} 
                    >{intl.get("save-button-label")}
        </Form.Button>  
    </Container>
  )
}

AdminSaveButton.propTypes = {
  variables: PropTypes.object.isRequired,
  mutation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
};

export default AdminSaveButton