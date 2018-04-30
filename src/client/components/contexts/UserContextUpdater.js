import React from 'react'
import { withUser } from './withUserContext'

class UserContextUpdater extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        const { userCtx, input } = nextProps

        if (userCtx.user != input) {
            userCtx.setUser(input)
        }
    }
   
    render() {
        return this.props.children || null
    }
}

export default withUser(UserContextUpdater)