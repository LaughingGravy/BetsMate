import React from 'react'
import express from 'express'
import compression from 'compression'
import chalk from 'chalk'
import path from 'path'

import Config from '../utilities/Config';
import PATHS from '../utilities/paths'
import { logServerStarted } from '../library/console';

import enGB from '../dist/dev/locales/en-GB.json';
import jaJP from '../dist/dev/locales/ja-JP.json';

// Extend the server base
import server, { createReactHandler, addLocalesRoutes, addFavicon } from './server-base';

// Get manifest values
const css = '../dist/dev/assets/css/style.css';
const scripts = ['vendor.js', 'browser.js'];
const chunkManifest = {}

const { app, router, listen, runApolloEngine } = server

app.use(express.static(PATHS.distDev))
app.use(compression()) 

addFavicon(PATHS.distDev)
addLocalesRoutes(enGB, jaJP)

app.use(router)
app.get('/*', createReactHandler(css, scripts))
  
if (Config.isRunEngine) {
    runApolloEngine()
}
else {
    // Spawn the server
    listen();

    logServerStarted({
        type: 'development server',
    });    
}






