import gql from 'graphql-tag';

export default gql`
mutation CreateCountry($code: String, $name: String)
{
  createCountry (code: $code, name: $name) {
    code
    name
  }
}
`