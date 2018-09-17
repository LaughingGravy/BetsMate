import gql from 'graphql-tag';

export default gql`
mutation ChangePassword($email: String, $password: String)
{
  changePassword (email: $email, password: $password) {
    email
  }
}
`