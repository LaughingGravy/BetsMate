import React from 'react'
import { graphql, compose } from 'react-apollo';
import { history } from '../../../../library/routing';
import LOGOUT from '../../graphql/mutations/authentication/logout'
import CURRENT_USER from '../../graphql/queries/authentication/currentUser'
 
class Logout extends React.PureComponent {
    constructor(props) {
       super(props);

       this.onLogoutSuccessful = this.onLogoutSuccessful.bind(this);
       this.onSubmit = this.onSubmit.bind(this);
    }

    onLogoutSuccessful(data) {
        history.push("/");
    }

    onSubmit() {
        this.props.mutate({
            refetchQueries: [ {query: CURRENT_USER}],
            onCompleted:  this.onLogoutSuccessful 
        })
    }

    render() {
        const { children } = this.props

        return (
            <span onClick={(e) => {this.onSubmit(e)}}> 
                { children }
            </span>
        )
    }
}

export default compose(
    graphql(LOGOUT),
    graphql(CURRENT_USER)
)(Logout)