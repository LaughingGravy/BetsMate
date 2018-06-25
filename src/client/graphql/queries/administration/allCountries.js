import gql from 'graphql-tag';

export default gql`
query {
    countries {
        code,
        name
      }
  }
`;