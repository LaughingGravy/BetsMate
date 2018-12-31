import gql from 'graphql-tag';

export default gql`
query GetStadium($id: String) {
  getStadium (id: $Id) {
      id,
      name,
      city,
      country {
        code
        name
      }
  }
}
`