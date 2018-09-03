import gql from 'graphql-tag';

export default gql`
mutation Reset($email: String, $token: String, $expiry: Date)
{
  reset (email: $email, token: $token, expiry: $Date) {
    email
    token
    expiry
  }
}
`