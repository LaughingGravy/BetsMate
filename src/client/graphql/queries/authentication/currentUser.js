import gql from 'graphql-tag';

export default gql`
    query {
        user {
            displayName
            email
            role
        }
    }
`;