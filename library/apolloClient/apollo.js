import { ApolloClient } from 'apollo-client';
import { concat } from 'apollo-link'
import { InMemoryCache } from "apollo-cache-inmemory";
import { ErrorHandlerLink, getHttpLinkWithCookie, getHttpLinkWithoutCookie } from './links'

const defaultOptions = {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    }
}

export function getServerClient(req) {
  return new ApolloClient({
    ssrMode: true,
    link: concat(ErrorHandlerLink, getHttpLinkWithCookie(req)),
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
      }),
      defaultOptions: defaultOptions
  })
}

export function getBrowserClient() {
  return new ApolloClient({
                ssrMode: true,
                // Remember that this is the interface the SSR server will use to connect to the
                // API server, so we need to ensure it isn't firewalled, etc
                link: getHttpLinkWithoutCookie(),
                defaultOptions: defaultOptions,
                cache: new InMemoryCache({
                    dataIdFromObject: object => object.id || null
                    }).restore(window.__APOLLO_STATE__),
              })
}