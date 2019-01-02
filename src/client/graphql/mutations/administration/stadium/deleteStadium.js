import gql from 'graphql-tag';

export default gql`
mutation DeleteStadium($stadiumId: String)
{
  deleteStadium (stadiumId: $stadiumId) {
    stadiumId
    name
  }
}
`