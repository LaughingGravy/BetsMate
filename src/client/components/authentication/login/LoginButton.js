import React from 'react';
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

import { history } from '../../../../../library/routing'
import LOGIN from '../../../graphql/mutations/authentication/login'
import CURRENT_USER from '../../../graphql/queries/authentication/currentUser'

import MutationButton from '../../common/MutationButton'

// class LoginButton extends React.Component {
//   constructor(props) {
//      super(props);
//   }

//   onCompleted = (data) => {
//     history.push('/home');
//   }

//   render() {
//     const { variables, disabled } = this.props
//     const label = "login-button-label"

//     return (
//       <Mutation mutation={LOGIN} key={variables.email} 
        
//         onCompleted={this.onCompleted}

//         refetchQueries={[ {query: CURRENT_USER}]}>
//         {(login, { loading, error }) => (
//           <MutationButton variables={variables} disabled={disabled} mutation={login} 
//                           loading={loading} error={error} label={label} />
//       )}
//       </Mutation>
//     )
//   }
// }

const LoginButton = ({ variables, disabled }) => {

  const label = "login-button-label"

  const onCompleted = (data) => {
    history.push('/home');
  }

  return (
    <Mutation mutation={LOGIN} key={variables.email} 
      
      onCompleted={onCompleted}

      refetchQueries={[ {query: CURRENT_USER}]}>
      {(login, { loading, error }) => (
        <MutationButton variables={variables} disabled={disabled} mutation={login} 
                        loading={loading} error={error} label={label} />
    )}
    </Mutation>
  )
}

LoginButton.propTypes = {
  variables: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired
}

export default LoginButton