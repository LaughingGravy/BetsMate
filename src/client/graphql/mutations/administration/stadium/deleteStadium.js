import gql from 'graphql-tag';

export default gql`
mutation DeleteStadium($id: String)
{
  deleteStadium (id: $id) {
    id
    name
  }
}
`