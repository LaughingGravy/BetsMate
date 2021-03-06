import { createHttpLink } from 'apollo-link-http'
import { onError } from "apollo-link-error"
import fetch from 'isomorphic-fetch'
import { getServerURL } from '../../utilities/env'
import Config from "../../utilities/Config";

const ErrorHandlerLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

function getHttpLinkWithCookie(req)
{
  return createHttpLink({
            uri: `${getServerURL(Config.host, Config.port, Config.allowSSL)}/graphql`,
            credentials: 'same-origin',
            headers: {
              cookie: req.header('Cookie'),
            }
        })
}

function getHttpLinkWithoutCookie()
{
  return createHttpLink({
            uri: `${getServerURL(Config.host, Config.port, Config.allowSSL)}/graphql`,
            credentials: 'same-origin'
        })
}

export { ErrorHandlerLink, getHttpLinkWithCookie, getHttpLinkWithoutCookie }
