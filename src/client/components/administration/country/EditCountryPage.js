import React from 'react';
import intl from 'react-intl-universal'
import PropTypes from 'prop-types'
import { Grid, Container, GridColumn } from 'semantic-ui-react'

import { withUser } from '../../contexts/withUserContext'
import GET_COUNTRY_BY_CODE from '../../../graphql/queries/administration/getCountryByCode'
import CountryForm from './CountryForm'

class EditCountryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      code: props.match.params.code || "",
      countryName: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const { userCtx } = this.props
    const { code, countryName, loading, error } = this.state

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
            <h3>{intl.get("add-country-page-title")}</h3>
          </Grid.Row>

           {(userCtx.isAuthenticated && userCtx.user.role == 'admin') && 
         
              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>

                  <Query query={GET_COUNTRY_BY_CODE}>
                    {({ loading, error, data: { countryByCode }}) => {

                      if (loading) {
                        return <Container textAlign="center">loading...</Container>;
                      }

                      if (!error && countryByCode && !countryByCode.code.length) {
                        return <Grid.Row centered>Country not found.</Grid.Row>
                      }

                      return (    
                        <CountryForm  code={countryByCode.code} countryName={countryByCode.countryName} 
                                      handleChange={this.handleChange} />
                      )
                    }}
                  </Query>

                </GridColumn>
              </Grid.Row>
            }
        </Grid>
      </Container>
    )
  }
}

EditCountryPage.propTypes = {
  userCtx: PropTypes.object
};

export default withUser(EditCountryPage)