import ApolloClient from "apollo-boost";
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }
};

const httpLink = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});

const opt = {
    link: httpLink,
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
      }),
    defaultOptions: defaultOptions
};

export function getBrowserClient()
{
    return new ApolloClient(opt);
};