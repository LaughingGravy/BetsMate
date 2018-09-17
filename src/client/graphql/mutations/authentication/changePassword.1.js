import gql from 'graphql-tag';

export default gql`
mutation ChangePassword($email: String, $password: String, $newPassword: String)
{
  changePassword (email: $email, password: $password, newPassword: $newPassword) {
    email
  }
}
`