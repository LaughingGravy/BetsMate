import gql from 'graphql-tag';

export default gql`
mutation MergeStadium($stadiumId: String, $name: String, $city: String, $country: CountryInputType)
{
  mergeStadium (stadiumId: $stadiumId, name: $name, city: $city, country: $country) {
    stadiumId
    name
    city
    country {
      code
      name
    }
  }
}
`