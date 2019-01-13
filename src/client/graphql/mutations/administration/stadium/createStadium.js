import gql from 'graphql-tag';

export default gql`
mutation CreateStadium($name: String, $city: String, $country: CountryInputType)
{
  createStadium (name: $name, city: $city, country: $country) {
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