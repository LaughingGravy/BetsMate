const path = require('path');
const merge = require('webpack-merge');
const common = require('../webpack/webpack.dev.config');
const webpack = require('webpack');

const Config = require('../utilities/Config');
const PATHS = require('../utilities/paths');

// Host and port settings to spawn the dev server on
const HOST = process.env.BROWSER_HOST || Config.host;
const PORT = process.env.BROWSER_PORT || Config.port;
const LOCAL = `http://${HOST}:${PORT}/`;


 module.exports = merge(common, {
    mode: 'development',
    entry: {
        app: path.join(PATHS.client, 'index.js')
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});