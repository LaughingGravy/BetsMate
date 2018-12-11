import gql from 'graphql-tag';

export default gql`
mutation MergeStadium($id: String, $name: String, $city: String, $countryId: String)
{
  mergeStadium (id: $id, name: $name, city: $city, countryId: $countryId) {
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