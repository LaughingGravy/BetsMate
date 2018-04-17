const express = require('express');
const chalk = require('chalk'); 
const compression = require('compression');
const path = require('path');

import Config from '../../utilities/Config';
const createTransporter = require('../../Utilities/mailer');
const server = require('./server');

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

const app = server;

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(compression());

// return the site index page
app.get('/',function(req, res){//
   res.sendFile(path.resolve(__dirname, '../../dist') + '/index.html');
 });

// Serve the files on port 3000.
app.listen(Config.port, () => {
  console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
});