import React from 'react'
import express from 'express'
import compression from 'compression'
import chalk from 'chalk'
import path from 'path'

// Needed to read manifest files
import { readFileSync } from 'fs';

import Config from '../utilities/Config';
import PATHS from '../utilities/paths'
import { logServerStarted } from '../library/console';

import enGB from '../dist/public/assets/locales/en-GB.json';
import jaJP from '../dist/public/assets/locales/ja-JP.json';

// Extend the server base
import server, { createReactHandler, addLocalesRoutes, addFavicon } from './server-base';

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

//Read in manifest files
//const [manifest, chunkManifest] = ['manifest', 'chunk-manifest']
//  .map(name => JSON.parse(readFileSync(path.resolve(PATHS.dist, `${name}.json`), 'utf8')));

const [manifest] = ['manifest']
  .map(name => JSON.parse(readFileSync(path.resolve(PATHS.dist, `${name}.json`), 'utf8')));

// Get manifest values
const css = manifest['browser.css'];
const scripts = [
   'manifest.js',
   'vendor.js',
   'browser.js'].map(key => manifest[key]);

const { app, router, listen, runApolloEngine } = server

app.disable('x-powered-by');
app.use(express.static(PATHS.public))
app.use(compression()) 

addFavicon(PATHS.public)
addLocalesRoutes(enGB, jaJP)

app.use(router)
app.get('/*', createReactHandler(css, scripts, manifest))

if (Config.isRunEngine) {
    runApolloEngine()
}
else {
    // Spawn the server
    listen();

    logServerStarted({
      type: 'production server',
  }); 
}