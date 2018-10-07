import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

// apollo graphql client
import { ApolloProvider } from 'react-apollo';
import { getBrowserClient } from '../library/apolloClient/apollo'

// enclose app in container so can respond to hot re-loading changes
import { Container } from 'semantic-ui-react';

// root component of application
import App from '../src/client/components/App'
// Get the custom `history` that we'll use to feed down to our `<Router>`
import { history } from '../library/routing';

const client = getBrowserClient()

const Root = () =>  {
    return (
        <ApolloProvider client={client}>
            <Router history={history}>
                <App />
            </Router>
        </ApolloProvider>
    )
}

doRender()

function doRender() {
    ReactDOM.hydrate(
      <Root />,
      document.getElementById('content'),
    );
}
