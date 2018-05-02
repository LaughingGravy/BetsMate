import React from 'react';
import intl from 'react-intl-universal'
import { Mutation } from 'react-apollo'
import { Form, Loader, Grid, Container, GridColumn } from 'semantic-ui-react'
import { history } from '../../../../library/routing'
import REGISTER from '../../graphql/mutations/register'
import CURRENT_USER from '../../graphql/queries/currentUser'
import AuthErrorDisplay from './AuthErrorDisplay'

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: "",
      role: "user"
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onRegisterSuccessful(data) {
    history.goBack()
  }
  
  render() {
    const { password, email, role } = this.state

    return (
      
          <Container>
            <Grid columns={1} centered>
              <Grid.Row centered>
              <h1>{intl.get("register-page-title")}</h1>
              </Grid.Row>

              <Mutation mutation={REGISTER} 
                onCompleted={this.onRegisterSuccessful}
                refetchQueries={[ {query: CURRENT_USER}]}>
                {(signup, { loading, error, data }) => (
                  <Grid.Row centered>
                    <GridColumn mobile={16} tablet={8} computer={4}>
                      <Form onSubmit={e => {
                          e.preventDefault;
                          signup({ variables: { email, password, role } })
                        }}>    
                          <Form.Field required>
                            <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' onChange={this.handleChange} />
                          </Form.Field>

                          <Form.Field required>
                            <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder='Password...' onChange={this.handleChange} />
                          </Form.Field>

                          <Container textAlign='center'>
                            <Form.Button primary loading={loading}>{intl.get("register-button-label")}</Form.Button>
                          </Container>
                      </Form>
                      {error && <AuthErrorDisplay error={error} />}
                  </GridColumn>
                </Grid.Row>
               )}
               </Mutation>
           </Grid>
          </Container>       
    )
  }
}
  
  export default RegistrationPage;