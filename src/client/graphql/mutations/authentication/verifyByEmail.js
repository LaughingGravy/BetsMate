import gql from 'graphql-tag';

export default gql`
mutation VerifyByEmail($email: String, $emailVerificationString: String)
{
  verifyByEmail (email: $email, emailVerificationString: $emailVerificationString) {
    verified
  }
}
`