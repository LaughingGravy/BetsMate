import gql from 'graphql-tag';

export default gql`
mutation Register($token: String, $displayName: String, $password: String, $role: String)
{
  signup (token: $token, displayName: $displayName, password: $password, role: $role) {
    id
    email
    displayName
    role
  }
}
`