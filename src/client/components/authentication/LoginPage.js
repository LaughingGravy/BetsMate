import React from 'react';
import intl from 'react-intl-universal';
import { Mutation } from 'react-apollo';
import { Form } from 'semantic-ui-react';
import login from '../../graphql/mutations/login';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onSubmitRequested(e, data) {
    alert('logout requested');
  }

  render() {
    return (
      <Mutation mutation={login}>
        {(login, { data }) => (
          <div>
            <div>
              <h1>{intl.get("login-page-title")}</h1>
              <p>The Login page should appear here.</p>
            </div>
            <Form onSubmit= >
              <Form.Group  inline>
                <Form.Field required>
                  <Form.Input fluid label='Email' placeholder='example@domain.com' />
                </Form.Field>
                <Form.Field required>
                  <Form.Input type='password' fluid label='Password' placeholder='Password...' />
                </Form.Field>
              </Form.Group>
              <Form.Button>Login</Form.Button>
            </Form>
          </div>
        )}
      </Mutation>
    );
    
    // return (
    //   <div>
    //     <h1>{intl.get("login-page-title")}</h1>
    //     <p>The Login page should appear here.</p>
    //   </div>
    // );
  }
}
  
  export default LoginPage;