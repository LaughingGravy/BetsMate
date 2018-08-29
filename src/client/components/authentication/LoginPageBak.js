import React from 'react'
import intl from 'react-intl-universal'
import { Mutation } from 'react-apollo'
import { NavLink } from 'react-router-dom';
import { Form, Grid, Container, GridColumn } from 'semantic-ui-react'
import LOGIN from '../../graphql/mutations/authentication/login'
import CURRENT_USER from '../../graphql/queries/authentication/currentUser'
import { history } from '../../../../library/routing'

import GraphQLErrorDisplay from '../common/GraphQLErrorDisplay'

class LoginPageBak extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onLoginSuccessful(data) {
    history.goBack()
  }

  render() {
    const { password, email } = this.state

    return (
      <Container>
        <Grid columns={1} centered>
          <Grid.Row centered>
          <h3>{intl.get("login-page-title")}</h3>
          </Grid.Row>

          <Mutation mutation={LOGIN} 
                    onCompleted={this.onLoginSuccessful}
                    refetchQueries={[ {query: CURRENT_USER}]}>
            {(login, { loading, error, data }) => (
            <Grid.Row centered>
              <GridColumn mobile={16} tablet={8} computer={4}>
                <Form className='segment' onSubmit={e => {
                    e.preventDefault;
                    login({ variables: { email, password } })
                  }}>    
                    <Form.Field required>
                      <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' onChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field required>
                      <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder='Password...' onChange={this.handleChange} />
                    </Form.Field>

                    <Container textAlign='center'>
                      <Form.Button primary loading={loading}>{intl.get("login-button-label")}</Form.Button>
                      <Grid centered>
                        <Grid.Row centered columns={2} divided>
                          <GridColumn textAlign='right'>
                            <NavLink to="/register" key="register">
                              {intl.get("register-menu-header")}
                            </NavLink>
                          </GridColumn>
                          <GridColumn textAlign='left'>
                            <NavLink to="/reset" key="reset">
                              {intl.get("reset-menu-header")}
                            </NavLink>
                          </GridColumn>
                        </Grid.Row> 
                      </Grid>
                    </Container>                     
                </Form>
                {error && <GraphQLErrorDisplay error={error} />}
              </GridColumn>
            </Grid.Row>
            )}
          </Mutation>

        </Grid>
      </Container>            
    )
  }
}
  
export default LoginPageBak