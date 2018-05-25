import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// Copy files from `PATH.static` to `PATHS.distDev`
import CopyWebpackPlugin from 'copy-webpack-plugin';
import chalk from 'chalk'

import Config from '../utilities/Config'
import PATHS from '../utilities/paths'

import { regex, css } from './common';

const extractCSS = new ExtractTextPlugin({
    filename: 'assets/css/style.css',
    allChunks: true,
  });

// Extend the `browser.js` config
export default new WebpackConfig().extend({
    '[root]/browser.js': config => {
      // Optimise images
      config.module.rules.find(l => l.test.toString() === regex.images.toString())
        .use.push({
          loader: 'image-webpack-loader',
          // workaround for https://github.com/tcoopman/image-webpack-loader/issues/88
          options: {},
        });
  
      return config;
    },
  }).merge({
    mode: 'development',
    devtool: 'source-map',

    output: {
        path: PATHS.distDev
    },

    module: {
        rules: [
          // CSS loaders
          ...css.getExtractCSSLoaders(extractCSS, true /* sourceMaps = true */),
        ],
    },

    plugins: [

        // Global variables
        new webpack.DefinePlugin({
            // We're running on the server
            SERVER: true,
            'process.env': {
            // Debug development
            NODE_ENV: JSON.stringify('development'),
            BROWSER: true,
            DEBUG: true,
            },
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        // Fire up CSS extraction
        extractCSS,

        // Copy files from `PATHS.static` to `dist/dev`.  No transformations
        // will be performed on the files-- they'll be copied as-is
        new CopyWebpackPlugin([
            {
                from: PATHS.static,
                force: true, // This flag forces overwrites between versions
            },
        ]),

    ]
})