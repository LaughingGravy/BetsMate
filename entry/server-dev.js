const express = require('express');
const compression = require('compression');
import webpack from 'webpack';
import webpackMiddleware from'webpack-dev-middleware'
const chalk = require('chalk'); 
const path = require('path');
const { ApolloEngine } = require('apollo-engine');

import Config from '../utilities/Config';

// Extend the server base
import server, { createReactHandler, runApolloEngine } from './server-base';

// Get manifest values
const css = 'dev/assets/css/style.css';
const scripts = ['dev/vendor.js', 'dev/browser.js'];

// Spawn the development server.
// Runs inside an immediate `async` block, to await listening on ports
(async () => {
    const { app, router, listen } = server

    router.get('/*', createReactHandler(css, scripts));

    app.use(webpackMiddleware(compiler, options));
    app.use(require("webpack-hot-middleware")(compiler)); 
    app.use(router.routes())
    app.use(compression());  

    if (Config.isRunEngine) {
        runApolloEngine()
    }
    else {
        // Spawn the server
        listen();
    }
})



