import React from 'react'
import { Icon, Message } from 'semantic-ui-react'
import css from  '../styles/auth.css'

const GraphQLErrorDisplay = ( { error: {graphQLErrors, networkError} } ) => {
    return (
        <Message size='mini' attached='top' error>
            <Message.Content>
                <ul>
                    {graphQLErrors && graphQLErrors.map(({ message }, i) => {
                    return <li key={i}>{message}</li>
                    })}
                    {
                        networkError && <li className={css} key={networkError.statusCode}>{networkError.message}</li>
                    }
                </ul>
            </Message.Content>
        </Message>
    )
}

export default GraphQLErrorDisplay