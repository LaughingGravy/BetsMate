import React from 'react'
import AuthForm from './AuthForm';

export function withAuthButtonAuthForm(AuthButtonComponent) {
  const EnhancedForm = () => (
    <AuthForm>
      {AuthButtonComponent}
    </AuthForm>
  )

  return EnhancedForm
}