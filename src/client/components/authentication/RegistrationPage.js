import React from 'react';
import intl from 'react-intl-universal'
import { Mutation } from 'react-apollo'
import { Form, Loader, Grid, Container, GridColumn } from 'semantic-ui-react'
import REGISTER from '../../graphql/mutations/register'
import CURRENT_USER from '../../graphql/queries/currentUser'
import { history } from '../../../../library/routing'

class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      email: "",
      password: ""
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  onRegisterSuccessful(data) {
    history.goBack()
  }
  
  render() {
    const { password, email } = this.state

    return (
      <Mutation mutation={REGISTER} 
                onCompleted={this.onRegisterSuccessful}
                refetchQueries={[ {query: CURRENT_USER}]}>
        {(signup, { loading, error, data }) => (
          <Container>
            <Grid columns={1} centered>
              <Grid.Row centered>
              <h1>{intl.get("register-page-title")}</h1>
              </Grid.Row>

              <Grid.Row centered>
                <GridColumn mobile={16} tablet={8} computer={4}>
                  <Form onSubmit={e => {
                      e.preventDefault;
                      signup({ variables: { email, password } })
                    }}>    
                      <Form.Field required>
                        <Form.Input name='email' label={intl.get("email-label")} placeholder='example@domain.com' onChange={this.handleChange} />
                      </Form.Field>

                      <Form.Field required>
                        <Form.Input name='password' type='password' label={intl.get("password-label")} placeholder='Password...' onChange={this.handleChange} />
                      </Form.Field>

                      <Container textAlign='center'>
                        {!loading && <Form.Button primary>{intl.get("register-button-label")}</Form.Button>}
                        {loading && <Form.Button primary loading>{intl.get("register-button-label")}</Form.Button>}
                      </Container>
                  </Form>
                  {error && <Message attached='bottom' negative>
                           <Icon name='warning' />
                           An error occurred. Please try again.
                  </Message>}
               </GridColumn>
             </Grid.Row>
           </Grid>
          </Container>       
        )}
      </Mutation>
    )
  }
}
  
  export default RegistrationPage;