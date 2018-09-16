import gql from 'graphql-tag';

export default gql`
mutation LoginUser($email: String, $password: String)
{
  loginUser (email: $email, password: $password) {
    user: {
      displayName
      email
      role
      regDate
      lastAccessDate
    },
    token
  }
}
`