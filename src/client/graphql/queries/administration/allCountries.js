import gql from 'graphql-tag';

export default gql`
    query {
        country {
            code
            name
        }
    }
`;