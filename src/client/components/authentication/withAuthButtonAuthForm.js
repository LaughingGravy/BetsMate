import React from 'react'
import AuthForm from './AuthForm';

const withAuthButtonAuthForm = (AuthButtonComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
      return (
        <AuthForm render={variables => (
          <AuthButtonComponent {...this.props} variables={variables} /> 
        )}/>
      )
    }
  }
}

export { withAuthButtonAuthForm }


