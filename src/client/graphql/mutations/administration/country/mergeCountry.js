import gql from 'graphql-tag';

export default gql`
mutation MergeCountry($id: String, $code: String, $name: String)
{
  mergeCountry (id: $id, code: $code, name: $name) {
    code
    name
  }
}
`