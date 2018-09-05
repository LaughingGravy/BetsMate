import gql from 'graphql-tag';

export default gql`
mutation ResetLink($email: String)
{
  resetLink (email: $email) {
    email
    token
    expiry
  }
}
`