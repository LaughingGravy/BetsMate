const express = require('express');
const compression = require('compression');

const { ApolloEngine } = require('apollo-engine');

const chalk = require('chalk'); 
const path = require('path');

// Needed to read manifest files
import { readFileSync } from 'fs';

import { router, app, listen } from './server-base'
import Config from '../../utilities/Config';

import enGB from './dev/locales/en-GB.json';
import jaJP from './dev/locales/locales/ja-JP.json';

// Extend the server base
import server, { createReactHandler } from './server-base-ssr';

// serve the locale files
router.get('/dev/locales/en-GB.json',(req, res) => {
    res.send(enGB);
});

router.get('/dev/locales/ja-JP.json',(req, res) => {
    res.send(jaJP);
});

