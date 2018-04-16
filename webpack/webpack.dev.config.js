const path = require('path');
const merge = require('webpack-merge');
const common = require('../webpack/webpack.common.config');
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
        vendor: [
          'axios','prop-types','react','react-apollo','react-dom','react-helmet','react-intl-universal','react-router-dom',
          'semantic-ui-react','webpack-hot-middleware/client'
        ],
        app: [ PATHS.client + '/index.js', 'webpack-hot-middleware/client' ]
     },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});