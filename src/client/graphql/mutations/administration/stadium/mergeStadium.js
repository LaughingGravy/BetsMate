import gql from 'graphql-tag';

export default gql`
mutation MergeStadium($stadiumId: String, $name: String, $city: String, $countryCode: String)
{
  mergeStadium (stadiumId: $stadiumId, name: $name, city: $city, countryCode: $countryCode) {
    code
    name
    city
    country {
      code
      name
    }
  }
}
`