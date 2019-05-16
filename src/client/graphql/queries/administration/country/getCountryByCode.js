import gql from 'graphql-tag';

export default gql`
query CountryByCode($code:String) {
  countryByCode (code: $code) {
      code,
      name
  }
} 
`