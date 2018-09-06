import gql from 'graphql-tag';

export default gql`
mutation ResetLink($email: String, $timeZone: String)
{
  resetLink (email: $email, timeZone: $timeZone) {
    email
    token
    expiry
  }
}
`