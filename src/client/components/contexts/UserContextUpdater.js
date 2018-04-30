import React from 'react'
import { withUser } from './withUserContext'

class UserContextUpdater extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { userCtx, input } = nextProps

        if (userCtx.user != input) {         
            userCtx.setUser(input)
        }

        return null
    }
   
    render() {
        return this.props.children || null
    }
}

export default withUser(UserContextUpdater)