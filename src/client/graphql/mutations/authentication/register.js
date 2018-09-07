import gql from 'graphql-tag';

export default gql`
mutation Register($token: String, $username: String, $password: String, $role: String)
{
  signup (token: $token, username: $username, password: $password, role: $role) {
    id
    email
    username
    role
  }
}
`