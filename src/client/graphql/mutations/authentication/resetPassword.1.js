import gql from 'graphql-tag';

export default gql`
mutation ResetPassword($token: String, $password: String)
{
  resetPassword (token: $token, password: $password) {
    email
  }
}
`