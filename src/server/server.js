const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const path = require('path');

const Config = require('../../utilities/Config');
const PATHS = require('../../utilities/paths');

const enGB = require('../../static/locales/en-GB.json');
const jaJP = require('../../static/locales/ja-JP.json')  

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(favicon(path.resolve(PATHS.static, 'favicon.ico')));

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