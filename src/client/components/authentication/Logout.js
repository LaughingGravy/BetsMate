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
    }

    onLogoutSuccessful() {
        history.push("/");
    }

    render() {
        return (
            <Mutation mutation={LOGOUT} 
                onCompleted={this.onLogoutSuccessful}
                refetchQueries={[ {query: CURRENT_USER}]}>
                {(logout, { loading, error, data }) => (
                    <Form ref={this.logoutForm} id='logoutForm' method='post' onSubmit={e => {
                        e.preventDefault
                        console.log('logging out')
                        logout()                                                         
                    }}> 
                        { React.Children.map(this.props.children, child => {
                            return <span onClick={() => {document.getElementById("btnLogout").click()}}>{child}</span>
                        })} 
                        <Form.Button type='submit' id='btnLogout' style={{"display": "none"}}/>
                    </Form>
                )}
            </Mutation>
        )
    }
}

export default Logout