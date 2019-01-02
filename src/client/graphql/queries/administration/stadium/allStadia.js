import gql from 'graphql-tag'

export default gql`
query {
    stadia {
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