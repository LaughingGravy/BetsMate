import React from 'react'
import { Icon, Message } from 'semantic-ui-react'

const AuthErrorDisplay = ({ error }) => {
    return (
        <Message size='tiny' attached='top' error>
            <Message.Content>
                <ul>
                    {error.graphQLErrors.map(({ message }, i) => {
                    return <li key={i}>{message}</li>
                    })}
                </ul>
            </Message.Content>
        </Message>
    )
}

export default AuthErrorDisplay