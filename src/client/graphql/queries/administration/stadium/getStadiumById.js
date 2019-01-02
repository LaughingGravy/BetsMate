import gql from 'graphql-tag';

export default gql`
query StadiumById($stadiumId: String) {
  stadiumById (stadiumId: $stadiumId) {
    stadiumId,
    name,
    city,
    country {
      code
      name
    }
  }
}
`