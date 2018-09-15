import gql from 'graphql-tag';

export default gql`
mutation Register($displayName: String, $password: String, $role: String)
{
  signup (displayName: $displayName, password: $password, role: $role) {
    email
    displayName
    role
  }
}
`