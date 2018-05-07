import { createHttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error"

const ErrorHandlerLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});

export { ErrorHandlerLink, httpLink }
