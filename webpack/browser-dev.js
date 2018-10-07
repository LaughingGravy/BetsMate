import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin'
// Copy files from `PATH.static` to `PATHS.distDev`
import CopyWebpackPlugin from 'copy-webpack-plugin';
import chalk from 'chalk'
import path from 'path';

import { webpackProgress } from './common'

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
    devtool: 'cheap-module-eval-source-map',

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
        webpackProgress(
            `${chalk.magenta.bold('Betsmate browser bundle')} in ${chalk.bgMagenta.white.bold('development mode')}`,
        ),

        // Global variables
        new webpack.DefinePlugin({
             'process.env': {
                NODE_ENV: JSON.stringify('development'),
                BROWSER: true,
                DEBUG: true,
            },
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        // Fire up CSS extraction
        extractCSS,

        // Generate assets manifest
        new ManifestPlugin({
            // Put this in `dist` rather than `dist/public`
            fileName: path.join(PATHS.distDev, 'manifest.json'),
            // Prefix assets with '/' so that they can be referenced from any route
            publicPath: "/",
            inlineManifest: true,
        }),

        // Copy files from `PATHS.static` to `dist/dev`.  No transformations
        // will be performed on the files-- they'll be copied as-is
        new CopyWebpackPlugin([
            {
                from: PATHS.static,
                force: true, // This flag forces overwrites between versions
            },
        ]),

    ],

    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
                },
                commons: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name: 'vendor',
                chunks: 'all'
                }
            },
        }
      },
})