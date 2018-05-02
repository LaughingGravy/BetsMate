import React from 'react'
import { Icon, Message } from 'semantic-ui-react'

const AuthErrorDisplay = ( { error: {graphQLErrors, networkError} } ) => {
    return (
        <Message size='mini' attached='top' error>
            <Message.Content>
                <ul>
                    {graphQLErrors && graphQLErrors.map(({ message }, i) => {
                    return <li key={i}>{message}</li>
                    })}
                    {
                        networkError && <li key={networkError.statusCode}>{networkError.message}</li>
                    }
                </ul>
            </Message.Content>
        </Message>
    )
}

export default AuthErrorDisplay