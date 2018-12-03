import gql from 'graphql-tag';

export default gql`
mutation ResetChangePassword($email: String, $token: String, $password: String)
{
  resetChangePassword (email: $email, token: $token, password: $password) {
    saved
    message
  }
}
`