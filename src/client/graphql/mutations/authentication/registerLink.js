import gql from 'graphql-tag';

export default gql`
mutation RegisterLink($email: String, $timeZone: String)
{
  registerLink (email: $email, timeZone: $timeZone) {
    email
    token
    expiry
  }
}
`