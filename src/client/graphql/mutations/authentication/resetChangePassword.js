import gql from 'graphql-tag';

export default gql`
mutation ResetChangePassword($email: String, $password: String)
{
  resetChangePassword (email: $email, password: $password) {
    email
  }
}
`