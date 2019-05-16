import gql from 'graphql-tag';

export default gql`
query CountryByName($name: String, $skip: Int, $limit: Int) {
  countryByName (name: $name, skip: $skip, limit: $limit) {
      code,
      name
  }
} 
`