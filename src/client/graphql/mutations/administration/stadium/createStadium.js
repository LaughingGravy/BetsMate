import gql from 'graphql-tag';

export default gql`
mutation CreateStadium($name: String, $city: String, $countryId: String)
{
  createStadium (name: $name, city: $city, countryId: $countryId) {
    id
    name
    city
    country {
      id
      code
      name
    }
  }
}
`