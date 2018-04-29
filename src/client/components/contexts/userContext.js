import React from 'react'

const DefaultUser = {
    name: 'Guest', 
    email: '',
    role: 'guest',
    password: '',
    isAuthenticated: false
}

const UserContext = React.createContext({
    user: DefaultUser,
    setUser: () => {}
})

module.exports = { UserContext, DefaultUser };

  