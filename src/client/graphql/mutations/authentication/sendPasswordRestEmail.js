import gql from 'graphql-tag';

export default gql`
mutation SendPasswordResetEmail($email: String, $timeZone: String)
{
  sendPasswordResetEmail (email: $email, timeZone: $timeZone) {
    email
  }
}
`