import gql from 'graphql-tag';

export default gql`
mutation CreateCountry($code: String, $name: String)
{
  mergeCountry (code: $code, name: $name) {
    id
    code
    name
  }
}
`