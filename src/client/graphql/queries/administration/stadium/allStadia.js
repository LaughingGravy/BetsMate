import gql from 'graphql-tag'

export default gql`
query {
    stadia {
        id,
        name,
        city,
        country {
          code
          name
        }
      }
  }
`