import React from 'react'
import { UserContext } from '../contexts/userContext'

// This function takes a component...
export function withUser(Component) {
  // ...and returns another component...
  return function UserWrappedComponent(props) {
    // ... and renders the wrapped component with the context user!
    // Notice that we pass through any additional props as well
    return (
      <UserContext.Consumer>
        {userCtx => <Component {...props} userCtx={userCtx} />}
      </UserContext.Consumer>
    );
  };
}