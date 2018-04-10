// React
import React from 'react';

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
      <App />
    </Container>

  </div>
);

export default Main;