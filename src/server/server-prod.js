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

if (Config.isRunEngine)
{
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
  });

  // Handle error on Engine startup
  engine.on('error', err => {
    console.log(chalk.red.bold('There was an error starting the server or Engine.'));
    console.error(err);

    // The app failed to start, we probably want to kill the server
    process.exit(1);
  });

  // start your engine!
  engine.listen({
    port: Config.port,
    expressApp: server
  }, () => {
    console.log(chalk.green.bold(`Application listening on port ${Config.port}!\n`));
  });
}
else {
  // Serve the files with no engine.
  app.listen(Config.port, () => {
    console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
  });
}
