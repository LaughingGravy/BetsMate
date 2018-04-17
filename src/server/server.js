import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import helmet from 'helmet';

import models from '../database/models';
import passport from 'passport';
import passportConfig from '../services/auth';
import session from 'express-session';
import { connectMongoDB } from '../database/mongoDB';
const MongoStore = require('connect-mongo')(session);
import schema from '../graphql/schema';

import path from 'path';
import favicon from 'serve-favicon';

import Config from '../../utilities/Config';
import PATHS from '../../utilities/paths';

import enGB from '../../static/locales/en-GB.json';
import jaJP from '../../static/locales/ja-JP.json';

const app = express();

// Connect to the database
connectMongoDB(Config.mongoURL, Config.apolloClientOpt);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(favicon(path.resolve(PATHS.static, 'favicon.ico')));

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
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }));

// Instruct Express to pass on any request made to the '/graphiql' route
app.use('/graphiql', graphiqlExpress({
                        endpointURL: '/graphql',
                    }),
);

// test server is up
app.get('/ping',(req, res) => {
    res.send('pong');
});

app.get('/static/locales/en-GB.json',(req, res) => {
    res.send(enGB);
});

app.get('/static/locales/ja-JP.json',(req, res) => {
    res.send(jaJP);
});

module.exports = app;