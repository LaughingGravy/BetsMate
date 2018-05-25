import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import favicon from 'serve-favicon';
import React from 'react';

// React utility to transform JSX to HTML (to send back to the client)
import ReactDOMServer from 'react-dom/server';

// Initial view to send back HTML render
import Html from '../views/ssr';
import Html2 from '../views/ssr2';

// For pre-pending a `<!DOCTYPE html>` stream to the server response
import { PassThrough } from 'stream';

// HTTP & SSL servers.  We can use `config.enableSSL|disableHTTP()` to enable
// HTTPS and disable plain HTTP respectively, so we'll use Node's core libs
// for building both server types.
import http from 'http';
import https from 'https';

import { logServerStarted } from '../library/console'

// React Router HOC for figuring out the exact React hierarchy to display
// based on the URL
import { StaticRouter } from 'react-router-dom'

// apollo graphql client
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { getClient } from '../library/apolloClient/apollo'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import models from '../src/server/database/models'
import schema from '../src/server/graphql/schema'
import passportConfig from '../src/server/services/auth'

import passport from 'passport'
import session from 'express-session'

import { connectMongoDB } from '../src/server/database/mongoDB'
const MongoStore = require('connect-mongo')(session)

import path from 'path';
import Config from '../utilities/Config'
import PATHS from '../utilities/paths'

import { getServerURL } from '../utilities/env'

import App from '../src/client/components/App'

const app = express();

// check is server is up
app.get('/ping',(req, res) => {
  res.send('pong');
})

// enable cors
var corsOptions = {
    origin: getServerURL(Config.host, Config.port, Config.allowSSL),
    credentials: true // <-- REQUIRED backend setting
};
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

// Connect to the database
connectMongoDB(Config.mongoURL, Config.apolloClientOpt);

// Configures express to use sessions. This places an encrypted identifier
// on the users cookie. When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: Config.secret,
    store: new MongoStore({
        url: Config.mongoURL,
        autoReconnect: true
        })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// bodyParser is needed just for POST.
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => {
      return {
        schema: schema,
        context: {
            req: req
        },
        tracing: Config.isRunEngine,
        cacheControl: Config.isRunEngine
      };
    }),
);

// Instruct Express to pass on any request made to the '/graphiql' route
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}),
);

export function addLocalesRoutes(app, enGB, jaJP) {
  app.get('/static/locales/en-GB.json',(req, res) => {
    res.sendFile('C:\\Development\\Javascript\\Betsmate\\dist\\dev\\locales\\en-GB.json')
  })
  
  app.get('/static/locales/ja-JP.json',(req, res) => {
    res.sendFile('C:\\Development\\Javascript\\Betsmate\\dist\\dev\\locales\\ja-JP.json')
  })
}

export function addFavicon(app, iconPath) {
  app.use(favicon(path.join(iconPath, 'favicon.ico')));
}

export async function createReactHandler(req, res, css = [], scripts = [], chunkManifest = {}) {
  console.log("createReactHandler")
  //return async function reactHandler(req, res) {
    console.log("reactHandler")
    const routeContext = {};

    const client = getClient(true);

    // Generate the HTML from our React tree.  We're wrapping the result
    // in `react-router`'s <StaticRouter> which will pull out URL info and
    // store it in our empty `route` object
    const components = (
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={routeContext}> 
              <App />  
              </StaticRouter>  
        </ApolloProvider>    
    )

    // Wait for GraphQL data to be available in our initial render,
    // before dumping HTML back to the client
    await getDataFromTree(components);

    // Handle redirects
    if ([301, 302].includes(routeContext.status)) {
      // 301 = permanent redirect, 302 = temporary
      res.status = routeContext.status;

      // Issue the new `Location:` header
      res.redirect(routeContext.url);

      // Return early -- no need to set a response body
      return;
    }

    // Handle 404 Not Found
    if (routeContext.status === 404) {
      // By default, just set the status code to 404.  Or, we can use
      // `config.set404Handler()` to pass in a custom handler func that takes
      // the `ctx` and store

      // if (config.handler404) {
      //   config.handler404(ctx);

      //   // Return early -- no need to set a response body, because that should
      //   // be taken care of by the custom 404 handler
      //   return;
      // }

      res.status = routeContext.status;
    }

    // Create a stream of the React render. We'll pass in the
    // Helmet component to generate the <head> tag, as well as our Redux
    // store state so that the browser can continue from the server
    const reactStream = ReactDOMServer.renderToNodeStream(
      <Html
        helmet={Helmet.renderStatic()}
        window={{
          webpackManifest: chunkManifest,
          __APOLLO_STATE__: client.extract(),
        }}
        css={css}
        scripts={scripts}>
        {components}
      </Html>,
    );

    // Pipe the React stream to the HTML output
    reactStream.pipe(htmlStream);
  
    // Set the return type to `text/html`, and stream the response back to
    // the client
    res.status(200)
    res.type = 'text/html'
    res.body = htmlStream
    res.end()
  //}
}

// export function createReactHandler(css = [], scripts = [], chunkManifest = {}) {
//   return async function reactHandler(req, res) {

//     console.log("reached createReactHandler")

//     const routeContext = {};

//     const client = getClient(true);

//     // Generate the HTML from our React tree.  We're wrapping the result
//     // in `react-router`'s <StaticRouter> which will pull out URL info and
//     // store it in our empty `route` object
//     const components = (
//       <ApolloProvider client={client}>
//         <StaticRouter location={req.url} context={routeContext}>    
//             <App />    
//         </StaticRouter>
//       </ApolloProvider>
//     )

//     // Wait for GraphQL data to be available in our initial render,
//     // before dumping HTML back to the client
//     await getDataFromTree(components);

//     // Handle redirects
//     if ([301, 302].includes(routeContext.status)) {
//       // 301 = permanent redirect, 302 = temporary
//       res.status = routeContext.status;

//       // Issue the new `Location:` header
//       res.redirect(routeContext.url);

//       // Return early -- no need to set a response body
//       return;
//     }

//     // Handle 404 Not Found
//     if (routeContext.status === 404) {
//       // By default, just set the status code to 404.  Or, we can use
//       // `config.set404Handler()` to pass in a custom handler func that takes
//       // the `ctx` and store

//       // if (config.handler404) {
//       //   config.handler404(ctx);

//       //   // Return early -- no need to set a response body, because that should
//       //   // be taken care of by the custom 404 handler
//       //   return;
//       // }

//       res.status = routeContext.status;
//     }

//     const content = ReactDOMServer.renderToString(components);

//     const html = <Html2 helmet={Helmet.renderStatic()}
//                           scripts={scripts}
//                           state={client.extract()}
//                           css={css}
//                           children={content} 
//                            />
  
//     res.status(200)
//     res.send(`${ReactDOMServer.renderToStaticMarkup(html)}`)
//     res.end()
//   }
// }

export function runApolloEngine() {
  // Initialize engine with your API key. Alternatively,
  // set the ENGINE_API_KEY environment variable when you
  // run your program.
  const engine = new ApolloEngine({
    apiKey: Config.apolloEngineServiceId,
    sessionAuth: {
      // Use the value of the 'session-id' cookie to isolate responses
      // in the private full query cache from those from other sessions.
      cookie: 'session-id',
    }
  })

  //let port = process.env.PORT
  let port = Config.port

  if (Config.SSL_PORT) {
    //port = process.env.SSL_PORT
    port = Config.sslPort
  }

  // start your engine!
  engine.listen({
      port: Config.port,
      expressApp: server
    }, () => {
      logServerStarted({
        type: 'dev server with apollo engine',
      });
  });
}

// Listener function that will start http(s) server(s) based on userland
// config and available ports
export function listen(app) {
    // Spawn the listeners.
    const servers = [];

    const requestHandler = (request, response) => {
      console.log(request.url)
    }
  
    // Plain HTTP
    if (Config.enableHTTP) {
      servers.push(
        http.createServer(requestHandler).listen(Config.port, (err) => {
          if (err) {
            return console.log("Error: ", err)
          }
        })
      );
      console.log("add server to ", Config.port)
    }
  
    // SSL -- only enable this if we have an `SSL_PORT` set on the environment
    if (process.env.SSL_PORT) {
      servers.push(
        https.createServer(Config.sslOptions, app.req, app.res).listen(Config.sslPort),
      );
    }

    logServerStarted({
      type: 'dev server',
    });
  
    return servers;
  }

  export default {
    app,
    listen,
    runApolloEngine
  };