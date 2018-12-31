import gql from 'graphql-tag';

export default gql`
mutation MergeCountry($code: String, $name: String)
{
  mergeCountry (code: $code, name: $name) {
    code
    name
  }
}
`