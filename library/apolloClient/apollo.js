import ApolloClient from "apollo-boost"
import { concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ErrorHandlerLink, httpLink } from './links'

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

const opt = {
    link: concat(ErrorHandlerLink, httpLink),
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
      }),
    defaultOptions: defaultOptions
};

export function getBrowserClient()
{
    return new ApolloClient(opt);
};