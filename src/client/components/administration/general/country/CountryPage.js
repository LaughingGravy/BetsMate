import React from 'react';
import { Grid, Container } from 'semantic-ui-react'

const CountryPage = ({ children }) => {
  return (
    <Container fluid>
        {children}
    </Container>
  )
}

export default CountryPage;