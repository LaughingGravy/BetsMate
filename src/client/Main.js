// React
import React from 'react';
import { Router } from 'react-router-dom';
// Get the custom `history` that we'll use to feed down to our `<Router>`
import { history } from '../../library/routing';

// <Helmet> component for setting the page title/meta tags
import Helmet from 'react-helmet';

import App from '../client/components/App';
import { Container } from 'semantic-ui-react';

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
      <Router history={history}>
        <App />
      </Router>
    </Container>

  </div>
);

export default Main;