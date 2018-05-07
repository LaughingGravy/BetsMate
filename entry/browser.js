import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'

// Enable async/await and generators, cross-browser
import 'regenerator-runtime/runtime'

// apollo graphql client
import { ApolloProvider } from 'react-apollo';
import { getBrowserClient } from '../library/apolloClient/apollo';

// enclose app in container so can respond to hot re-loading changes
import { Container } from 'semantic-ui-react';

// root component of application
import App from '../src/client/components/App'
// Get the custom `history` that we'll use to feed down to our `<Router>`
import { history } from '../library/routing';

function doRender() {
    ReactDOM.hydrate(
      <Root />,
      document.getElementById('main'),
    );
}

const Root = (() => {
    // Wrap the component hierarchy in <BrowserRouter>, so that our children
    // can respond to route changes
    const Chain = () => (
        <Container fluid inverted='true'>
            <ApolloProvider client={client}>
                <Router history={history}>
                    <App />
                </Router>
            </ApolloProvider>
        </Container>
    )
})

doRender()