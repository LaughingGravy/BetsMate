
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Segment } from 'semantic-ui-react'
import Layout from './layout/Layout'
import Routes from './layout/Routes'

import { UserContext, DefaultUser } from './contexts/userContext'

class App extends React.Component{
  constructor(props) {
      super(props);

      this.setUser = this.setUser.bind(this);

      this.state = {
        userCtx: {
          user: DefaultUser,
          isAuthenticated: false,
          setUser: this.setUser
        }
      }
  }

  setUser (user) {
    let isAutheticated = user.email.trim().length > 0
    this.setState({
      userCtx: { 
        user: user,
        isAuthenticated: isAutheticated,
        setUser: this.setUser
      }            
    })
  }
  
  render() {
    return (          
      <Segment basic>
        <UserContext.Provider value={this.state.userCtx}> 
          <Layout>  
            <Routes />
          </Layout>
          </UserContext.Provider> 
      </Segment>         
    )      
  }
};

export default hot(module)(App)

