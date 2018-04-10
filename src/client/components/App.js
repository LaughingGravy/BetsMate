
import React from 'react'
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Segment } from 'semantic-ui-react';
import Layout from './layout/Layout';
import Routes from './layout/Routes';

const App = () => {
  return (
      <Segment basic>
          <Layout>  
            <Routes />
          </Layout>
      </Segment>
  );
};

export default hot(module)(App);

