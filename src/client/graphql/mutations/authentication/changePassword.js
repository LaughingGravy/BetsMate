import gql from 'graphql-tag';

export default gql`
mutation ChangePassword($email: String, $password: String, $newpassword: String)
{
  changePassword (email: $email, password: $password, newpassword: $newpassword) {
    saved
    message
  }
}
`