import gql from 'graphql-tag';

export default gql`
mutation ChangePassword($password: String)
{
  changePassword (password: $password) {
    email
  }
}
`