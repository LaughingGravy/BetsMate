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

// Patch global.`fetch` so that Apollo calls to GraphQL work
import 'isomorphic-fetch';

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

import enGB from '../dist/dev/locales/en-GB.json';
import jaJP from '../dist/dev/locales/ja-JP.json';

import vendor from '../dist/dev/vendor.js'
import browser from '../dist/dev/browser.js'

import App from '../src/client/components/App'

export const router = express.Router()

// test server is up
router.get('/ping',(req, res) => {
    res.send('pong');
});

router.get('static/locales/en-GB.json',(req, res) => {
    res.send(enGB)
})
  
  router.get('static/locales/ja-JP.json',(req, res) => {
    res.send(jaJP)
})

const css = 'assets/css/style.css';
const scripts = ['vendor.js', 'browser.js'];

const app = express();

// enable cors
var corsOptions = {
    origin: getServerUrl(Config.host, Config.port),
    credentials: true // <-- REQUIRED backend setting
};
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(favicon('/favicon.ico'));

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

app.use("/static", express.static( path.resolve( __dirname, "../dist/dev" ) ) );

app.use((req, res) => {
    const routeContext = {};

    const client = getClient(true);

    const components = (
    <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={routeContext}>    
            <App />    
        </StaticRouter>
    </ApolloProvider>
    )

    getDataFromTree(components).then(() => {
        // We are ready to render for real
        const content = ReactDOM.renderToString(App);
        const initialState = client.extract();
      
        const html = <Test content={content} state={initialState} />;
      
        res.status(200);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
      });
})

const Test = ({ content, state }) => {

    return (
      <html>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
                }} />
          <script key={"vendor"} src={"/dev/vendor.js"} />
          <script key={"browser"} src={"/dev/browser.js"} />   
          <script>
              
          </script>
        </body>
      </html>
    );
}

