const express = require('express');
const compression = require('compression');
import webpack from 'webpack';
import webpackMiddleware from'webpack-dev-middleware'
const chalk = require('chalk'); 
const path = require('path');
const { ApolloEngine } = require('apollo-engine');

import Config from '../utilities/Config';

import enGB from '../dist/dev/locales/en-GB.json';
import jaJP from '../dist/dev/locales/ja-JP.json';

// Extend the server base
import server, { createReactHandler, runApolloEngine, addLocalesRoutes } from './server-base';

// Get manifest values
const css = 'assets/css/style.css';
const scripts = ['/dist/vendor.js', '/dist/browser.js'];

// Spawn the development server.
// Runs inside an immediate `async` block, to await listening on ports
(async () => {
    const { app, router, listen } = server

    app.use( express.static( path.resolve( __dirname, "../dist/dev" ) ) );

   //addLocalesRoutes(router, enGB, jaJP)

    app.get('static/locales/en-GB.json',(req, res) => {
        res.send(enGB);
    });
   
    app.get('static/locales/ja-JP.json',(req, res) => {
        res.send(jaJP);
    });

    router.get('/*', (req, res) => createReactHandler(css, scripts))

    //app.use(webpackMiddleware(compiler, options));
   // app.use(require("webpack-hot-middleware")(compiler)); 
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



