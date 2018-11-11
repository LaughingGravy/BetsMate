import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import cors from 'cors';
import favicon from 'serve-favicon';
import React from 'react';
import Helmet from 'react-helmet';

import passport from 'passport'
import session from 'express-session'
//const MongoStore = require('connect-mongo')(session)

// HTTP & SSL servers.  We can use `config.enableSSL|disableHTTP()` to enable
// HTTPS and disable plain HTTP respectively, so we'll use Node's core libs
// for building both server types.
import http from 'http';
import https from 'https';

// React Router HOC for figuring out the exact React hierarchy to display
// based on the URL
import { StaticRouter } from 'react-router-dom'

// Initial view to send back HTML render
import Html from '../views/ssr';

import { logServerStarted } from '../library/console'

// apollo graphql client
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import { getServerClient } from '../library/apolloClient/apollo'
// React utility to transform JSX to HTML (to send back to the client)
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import { getServerURL } from '../utilities/env'

import models from '../src/server/database/models'
import schema from '../src/server/graphql/schema'
import passportConfig from '../src/server/services/auth'

//import { connectMongoDB } from '../src/server/database/mongoDB'

import path from 'path';
import Config from '../utilities/Config'
import PATHS from '../utilities/paths'

import App from '../src/client/components/App'

const app = express()
const router = express.Router()

// Connect to the mongo database
//connectMongoDB(Config.mongoURL, Config.apolloClientOpt);

// enable cors
var corsOptions = {
    origin: getServerURL(Config.host, Config.port, Config.allowSSL),
    credentials: true // <-- REQUIRED backend setting
};

app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Configures express to use sessions. This places an encrypted identifier
// on the users cookie. When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
// app.use(session({
//   resave: true,
//   saveUninitialized: true,
//   secret: Config.secret,
//   store: new MongoStore({
//       url: Config.mongoURL,
//       autoReconnect: true
//       })
// }));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js 
app.use(passport.initialize());
// app.use(passport.session());

//check that server is up
router.get('/ping',(req, res) => {
  res.send('pong');
})

// // Instruct Express to pass on any request made to the '/graphql' route
// // bodyParser is needed just for POST.
router.use(
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
)

// Instruct Express to pass on any request made to the '/graphiql' route
router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  }),
)

export function addLocalesRoutes(enGB, jaJP) {
  router.get('/static/locales/en-GB.json',(req, res) => {
    res.send(JSON.stringify(enGB))
  })
  
  router.get('/static/locales/ja-JP.json',(req, res) => {
    res.send(JSON.stringify(jaJP))
  })
}

export function addFavicon(iconPath) {
  router.use(favicon(path.join(iconPath, 'favicon.ico')));
}

export function createReactHandler(css = [], scripts = [], chunkManifest = {}) {
  return async function reactHandler(req, res) {

    const client = getServerClient(req)

    const routeContext = {};
        
    // The client-side App will instead use <BrowserRouter>
    const components = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={routeContext}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    )

    await getDataFromTree(components) 

    // Handle redirects
    if ([301, 302].includes(routeContext.status)) {
      // 301 = permanent redirect, 302 = temporary
      req.status = routeContext.status;

      // Issue the new `Location:` header
      req.redirect(routeContext.url);

      // Return early -- no need to set a response body
      return;
    }  
      
    // Handle 404 Not Found
    if (routeContext.status === 404) {
      // By default, just set the status code to 404.  Or, we can use
      // `config.set404Handler()` to pass in a custom handler func that takes
      // the `ctx` and store

      req.status = routeContext.status;
    }  
      
    // We are ready to render for real
    const content = renderToString(components);
    const initialState = client.extract();

    // Create a stream of the React render. We'll pass in the
    // Helmet component to generate the <head> tag, as well as our Redux
    // store state so that the browser can continue from the server
    const html = <Html
                    helmet={Helmet.renderStatic()}
                    window={{
                      webpackManifest: chunkManifest,
                      __APOLLO_STATE__: client.extract(),
                    }}
                    css={css}
                    scripts={scripts}>
                    {components}
                </Html>

      res.status(200);
      res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
      res.end();
  }
}

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
export function listen() {
    // Spawn the listeners.
    const servers = [];

    // Plain HTTP
    if (Config.enableHTTP) {
      servers.push(
        http.createServer(app).listen(Config.port, (err) => {
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
        https.createServer(Config.sslOptions, app).listen(Config.sslPort),
      );
    }
    
    return servers;
  }

  export default {
    app,
    router,
    listen,
    runApolloEngine
  };