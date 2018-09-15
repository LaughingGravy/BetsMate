import gql from 'graphql-tag';

export default gql`
mutation Registerbak($token: String, $displayName: String, $password: String, $role: String)
{
  signup1 (token: $token, displayName: $displayName, password: $password, role: $role) {
    id
    email
    displayName
    role
  }
}
`