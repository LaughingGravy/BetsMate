import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Form, Grid, Container, GridColumn } from 'semantic-ui-react'
import { history } from '../../../../../library/routing'
import { Query, withApollo, compose } from 'react-apollo'

import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'

import { withUser } from '../../contexts/withUserContext'


import CountryForm from './CountryForm'

// class EditCountryPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { 
//       code: props.match.params.code || "",
//       countryName: ""
//       // isEdit: props.match.params.code.length > 0
//     }
//   }

const EditCountryPage = ({ userCtx, match } ) => {
  const code = match.params.code  

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
            <h3>{intl.get("add-country-page-title")}</h3>
          </Grid.Row>

           {(userCtx.isAuthenticated && userCtx.user.role == 'admin') && 
            <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>

                  <Query query={GET_COUNTRY_BY_CODE} variables={{ code }}>
                  {({ loading, error, data }) => {

                    if (loading) {
                      return <Container textAlign="center">loading...</Container>;
                    }

                    if (!error && !data) {
                      return <Grid.Row centered>`Country with code ${code} not found`</Grid.Row>
                    }

                    const { countryByCode } = data

                    return (
                      <CountryForm  code={countryByCode.code} countryName={countryByCode.name}
                                onSubmit={e => {
                                            e.preventDefault             
                                          }} />
                    )
                  }}
                  </Query>
                </GridColumn>
            </Grid.Row>}

        </Grid>
      </Container>
    )
}

EditCountryPage.propTypes = {
  userCtx: PropTypes.object
};

export default compose(
  withApollo
)(withUser(EditCountryPage))