import gql from 'graphql-tag';

export default gql`
mutation DeleteCountry($code: String)
{
  deleteCountry (code: $code) {
    code
    name
  }
}
`