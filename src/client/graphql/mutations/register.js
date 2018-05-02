import gql from 'graphql-tag';

export default gql`
mutation Register($email: String, $password: String, $role: String)
{
  signup (email: $email, password: $password, role: $role) {
    id
    email
    role
  }
}
`