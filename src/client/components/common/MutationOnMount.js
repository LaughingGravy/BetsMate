import React from 'react';
import { Mutation } from 'react-apollo'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { renderMessageForError } from './ConditionalRender'
import GraphQLErrorDisplay from '../common/GraphQLErrorDisplay'

const EnhancedGraphQLErrorDisplay = compose(
  renderMessageForError(GraphQLErrorDisplay)
)(GraphQLErrorDisplay)

class DoMutation extends React.Component {
  componentDidMount() {
    const { mutate, variables } = this.props;

    mutate({variables});
  };

  render() {
    return null;
  };
};

const MutationOnMount = ({ variables, mutation, onCompleted, children}) => {
  return (
    <Mutation mutation={mutation} onCompleted={onCompleted}>
      {(mutation, { data, loading, error }) => {
        console.log("error", error)
        return (
        <React.Fragment>
          <EnhancedGraphQLErrorDisplay error={error} />
          <DoMutation mutate={mutation} variables={variables} />
          { children && children((mutation, { data, loading, error })) }
        </React.Fragment>
        )
      }}
    </Mutation>
  )
}

MutationOnMount.propTypes = {
  variables: PropTypes.object.isRequired,
  mutation: PropTypes.object.isRequired,
  onCompleted: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.object)
};


export default MutationOnMount;