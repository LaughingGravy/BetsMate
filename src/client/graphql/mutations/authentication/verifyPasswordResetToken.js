import gql from 'graphql-tag';

export default gql`
mutation VerifyPasswordResetToken($email: String, $token: String)
{
  verifyPasswordResetToken (email: $email, token: $token) {
    verified
    message
  }
}
`