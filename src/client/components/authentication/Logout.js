import React from 'react'
import intl from 'react-intl-universal'
import { Mutation } from 'react-apollo'
import { Form, Loader, Grid, Container, GridColumn, FormField } from 'semantic-ui-react'
import { history } from '../../../../library/routing';
import LOGOUT from '../../graphql/mutations/logout'
import CURRENT_USER from '../../graphql/queries/currentUser'

// const Logout = ({ children }) => {

class Logout extends React.Component {
    constructor(props) {
        super(props);

        this.logoutForm = React.createRef();
    }

    onSubmit(e, data) {
        console.log('logout')
        this.logoutForm.submit()
    }

    onLoginSuccessful() {
        let pathname = history.location["pathname"];
        history.push(`\\`)  
    }

    render() {
        return (
            <Mutation mutation={LOGOUT} 
                onCompleted={this.onLoginSuccessful}
                refetchQueries={[ {query: CURRENT_USER}]}>
                {(logout, { loading, error, data }) => (
                    <Form ref={this.logoutForm} onSubmit={e => {
                        e.preventDefault
                        console.log('logging out')
                        logout                                                         
                    }}> 
                        { React.Children.map(this.props.children, child => {
                            return <span onClick={this.onSubmit.bind(this)}>{child}</span>
              
                        })} 
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default Logout