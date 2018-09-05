import React from 'react'
import { Message } from 'semantic-ui-react'
import intl from 'react-intl-universal'
import css from  '../styles/auth.css'

const GraphQLErrorDisplay = ( { error: { graphQLErrors, networkError } } ) => {
    return (
        <Message size='mini' floating error visible>
            <Message.Content>
                <ul>
                    {graphQLErrors && graphQLErrors.map(({ message }, i) => {
                    return <li key={i}>{intl.getHTML(message).defaultMessage(message)}</li>
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

