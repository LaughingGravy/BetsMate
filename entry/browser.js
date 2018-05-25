import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

// Enable async/await and generators, cross-browser
import 'regenerator-runtime/runtime'

// apollo graphql client
import ApolloClient from "apollo-boost"
import { ApolloProvider } from 'react-apollo';
import { getBrowserClient } from '../library/apolloClient/apollo';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

// enclose app in container so can respond to hot re-loading changes
import { Container } from 'semantic-ui-react';

// root component of application
import App from '../src/client/components/App'
// Get the custom `history` that we'll use to feed down to our `<Router>`
import { history } from '../library/routing';

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }
};

const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
        uri: '/graphql',
        credentials: 'same-origin',
    }),
    defaultOptions: defaultOptions,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
        }).restore(window.__APOLLO_STATE__),
});

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



