import gql from 'graphql-tag';

export default gql`
mutation Register($email: String, $displayName: String, $password: String, $role: String, $timeZone: String)
{
  register (email: $email, displayName: $displayName, password: $password, role: $role), timeZone: $timeZone) {
    email
    displayName
    role
  }
}
`