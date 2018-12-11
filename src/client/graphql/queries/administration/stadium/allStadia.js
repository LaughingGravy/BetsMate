import gql from 'graphql-tag'

export default gql`
query {
    stadium {
        id,
        name,
        city,
        country {
          id
          code
          name
        }
      }
  }
`