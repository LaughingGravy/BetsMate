import gql from 'graphql-tag';

export default gql`
mutation SendPasswordReset($email: String, $timeZone: String)
{
  sendPasswordReset (email: $email, timeZone: $timeZone) {
    email
  }
}
`