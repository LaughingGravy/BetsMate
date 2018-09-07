import gql from 'graphql-tag';

export default gql`
    query {
        user {
            username
            email
            role
        }
    }
`;