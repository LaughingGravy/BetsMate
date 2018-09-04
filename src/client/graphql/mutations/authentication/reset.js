import gql from 'graphql-tag';

export default gql`
mutation Reset($email: String)
{
  reset (email: $email) {
    email
    token
    expiry
  }
}
`