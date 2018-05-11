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

const cache = new InMemoryCache({
    dataIdFromObject: object => object.id || null
  })

export function getClient(ssrMode = false)
{
    let opt = {
        ssrMode: ssrMode,
        link: concat(ErrorHandlerLink, httpLink),
        cache: cache,
        defaultOptions: defaultOptions
    };

    return new ApolloClient(opt);
};

export function getBrowserClient(ssrMode = false)
{
    let opt = {
        ssrMode: ssrMode,
        link: concat(ErrorHandlerLink, httpLink),
        cache: new InMemoryCache({
            dataIdFromObject: object => object.id || null
          }).restore(window.__APOLLO_STATE__),
        defaultOptions: defaultOptions
    };

    return new ApolloClient(opt);
};