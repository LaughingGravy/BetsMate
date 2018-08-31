import React from 'react'
import AuthForm from './AuthForm';

const withAuthButtonAuthForm = (AuthButtonComponent) => {
  return class extends React.Component {
    render() {
      return (
        <AuthForm>
          <AuthButtonComponent />
        </AuthForm>
      )
    }
  }
}

export { withAuthButtonAuthForm }
