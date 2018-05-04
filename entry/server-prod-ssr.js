import express from 'express'
import chalk from 'chalk'
import compression from 'compression'
import path from 'path'
import { ApolloEngine } from 'apollo-engine'

// Needed to read manifest files
import { readFileSync } from 'fs';

import { router, app, listen } from './server-base'
import Config from '../../utilities/Config';

import enGB from './public/locales/en-GB.json';
import jaJP from './public/locales/locales/ja-JP.json';

// Extend the server base
import server, { createReactHandler } from './server-base-ssr';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

// process.on('uncaughtException', function (er) {
//   console.error(er.stack) 
//   createTransporter().sendMail({
//     from: 'r_l_paul@hotmail.com',
//     to: 'r_l_paul@hotmail.com',
//     subject: er.message,
//     text: er.stack
//   }, function (er) {
//      if (er) console.error(er)
//      process.exit(1) 
//   })
// });

// serve the locale files
router.get('/static/locales/en-GB.json',(req, res) => {
    res.send(enGB);
});

router.get('/static/locales/ja-JP.json',(req, res) => {
    res.send(jaJP);
});

// Read in manifest files
const [manifest, chunkManifest] = ['manifest', 'chunk-manifest']
  .map(name => JSON.parse(readFileSync(path.resolve(PATHS.dist, `${name}.json`), 'utf8')));

// Get manifest values
const css = manifest['browser.css'];
const scripts = [
  'manifest.js',
  'vendor.js',
  'browser.js'].map(key => manifest[key]);

// Spawn the development server.
// Runs inside an immediate `async` block, to await listening on ports
(async () => {
  const { app, router, listen, runApolloEngine } = server;

  // Connect the production routes to the server
  router.get('/*', createReactHandler(css, scripts, chunkManifest));
  app.use(router.routes())
  app.use(compression());

  if (Config.isRunEngine) {
    runApolloEngine()
  }
  else {
    // Spawn the server
    listen();
  }

  // Log to the terminal that we're ready for action
  logServerStarted({
    type: 'server',
  })

})();