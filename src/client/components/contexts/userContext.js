import React from 'react'

const DefaultUser = {
    displayName: 'Guest', 
    email: '',
    role: 'guest'
}

const UserContext = React.createContext({
    user: DefaultUser,
    isAuthenticated: false,
    setUser: () => {}
})

export { UserContext, DefaultUser }


  