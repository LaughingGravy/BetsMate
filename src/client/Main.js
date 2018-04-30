// React
import React from 'react';
import { Router } from 'react-router-dom';

import Config from '../../utilities/Config';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';

// apollo graphql client
import { ApolloProvider } from 'react-apollo';
import { getBrowserClient } from '../../library/apolloClient/apollo';

// Get the custom `history` that we'll use to feed down to our `<Router>`
import { history } from '../../library/routing';

import App from '../client/components/App';
import { Container } from 'semantic-ui-react';

// get apollo client 
const client = getBrowserClient();

// Styles
//import css from './main.scss';

const Main = () => (
  <div>
    <Helmet>
      <title>Bets Mate</title>
      <meta name="description" content="Football Match Predictor" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
    </Helmet>

    <Container fluid inverted='true'>
      <ApolloProvider client={client}>
        <Router history={history}>
          <App />
        </Router>
      </ApolloProvider>
    </Container>

  </div>
);

export default Main;