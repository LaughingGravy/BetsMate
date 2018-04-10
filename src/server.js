const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Config = require('../utilities/Config');
const chalk = require('chalk'); 
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const favicon = require('serve-favicon');
const createTransporter = require('../Utilities/mailer');

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

process.on('uncaughtException', function (er) {
  console.error(er.stack) 
  createTransporter().sendMail({
    from: 'r_l_paul@hotmail.com',
    to: 'r_l_paul@hotmail.com',
    subject: er.message,
    text: er.stack
  }, function (er) {
     if (er) console.error(er)
     process.exit(1) 
  })
});


//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use(favicon(path.resolve(__dirname, '../dist') + '/favicon.ico'));

// check to see is server is up
app.get('/ping',(req, res) => {
  res.send('pong');
})

// return the site index page
app.get('/',function(req, res){//
   res.sendFile(path.resolve(__dirname, '../dist') + '/index.html');
 });


// Serve the files on port 3000.
app.listen(Config.port, () => {
  console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
});