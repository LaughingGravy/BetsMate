const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');

const models = require('../database/models')
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfig = require('../services/auth');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const schema = require('../graphql/schema');

const path = require('path');
const favicon = require('serve-favicon');

const Config = require('../../utilities/Config');
const PATHS = require('../../utilities/paths');

const enGB = require('../../static/locales/en-GB.json');
const jaJP = require('../../static/locales/ja-JP.json')  

const app = express();

//Mongoose's built in promise has been deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log success/failure message
mongoose.connect(Config.mongoURL);
mongoose.connection
    .once('open', () => console.log(chalk.green('Connected to MongoDB instance.'))
    .on('error', error => console.log(chalk.red(`Error connecting to MongoDB instance: ${error}`)));

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

// test server is up
app.get('/ping',(req, res) => {
    res.send('pong');
});

app.get('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));
  
app.get('/static/locales/en-GB.json',(req, res) => {
    res.send(enGB);
});

app.get('/static/locales/ja-JP.json',(req, res) => {
    res.send(jaJP);
});

module.exports = app;