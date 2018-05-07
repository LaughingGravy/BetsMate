import React from 'react'

const DefaultUser = {
    name: 'Guest', 
    email: '',
    role: 'guest',
    password: ''
}

const UserContext = React.createContext({
    user: DefaultUser,
    isAuthenticated: false,
    setUser: () => {}
})

export { UserContext, DefaultUser }


  