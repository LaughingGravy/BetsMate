import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import chalk from 'chalk';
import path from 'path';

// Plugins
import CleanWebpackPlugin from 'clean-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
// Compression plugin for generating `.gz` static files
import BrotliGzipPlugin from 'brotli-gzip-webpack-plugin'

// Plugin for computing chunk hash
import WebpackChunkHash from 'webpack-chunk-hash';

import ManifestPlugin from 'webpack-manifest-plugin'
// Chunk Manifest plugin for generating a chunk asset manifest
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
// Copy files from `PATH.static` to `PATHS.public`
import CopyWebpackPlugin from 'copy-webpack-plugin'
// Bundle Analyzer plugin for viewing interactive treemap of bundle
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
// css 
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

import { regex, css, webpackProgress } from './common';
import PATHS from '../utilities/paths';

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
    mode: 'production',

    output: {
        // Filenames will be <name>.<chunkhash>.js in production on the browser
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: PATHS.public,
        publicPath: "/"
    },

    module: {
        rules: [
            css.prodRules
        ]
    },

    plugins: [
        webpackProgress(
            `${chalk.magenta.bold('Betsmate browser bundle')} in ${chalk.bgMagenta.white.bold('production')}`,
        ),

        // Global variables
        new webpack.DefinePlugin({
            'process.env': {
               NODE_ENV: JSON.stringify('production'),
               BROWSER: true,
               DEBUG: false,
           },
       }),

        // A plugin for a more aggressive chunk merging strategy
        new webpack.optimize.AggressiveMergingPlugin(),

        new webpack.HashedModuleIdsPlugin(),

        //Brotli compression-- often significantly smaller than the gzip equivalent
        new BrotliGzipPlugin({
            asset: '[path].br[query]',
            algorithm: 'brotli',
            test: /\.(js|css|html|svg)$/,
            //threshold: 10240,
            minRatio: 0.99
        }),

        //Compress assets into .gz files
        new BrotliGzipPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            //threshold: 10240,
            minRatio: 0.99
        }),

        new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash].css",
            chunkFilename: "assets/css/[id].[contenthash].css"
        }),

        // Generate chunk manifest
        new ChunkManifestPlugin({
            // Put this in `dist` rather than `dist/public`
            filename: path.join(PATHS.dist, 'chunk-manifest.json'),
            manifestVariable: 'webpackManifest'
        }),

        // Generate assets manifest
        new ManifestPlugin({
            // Put this in `dist` rather than `dist/public`
            fileName: path.join(PATHS.dist, 'manifest.json'),
            // Prefix assets with '/' so that they can be referenced from any route
            publicPath: "/",
            inlineManifest: true,
        }),

        // Output interactive bundle report
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: path.join(PATHS.dist, 'report.html'),
            openAnalyzer: !!process.env.BUNDLE_ANALYZER,
        }),
  
        // Enable scope hoisting to speed up JS loading
        new webpack.optimize.ModuleConcatenationPlugin(),

        // Copy files from `PATHS.static` to `dist/public`.  No transformations
        // will be performed on the files-- they'll be copied as-is
        new CopyWebpackPlugin([
            {
                from: PATHS.static,
                force: true, // This flag forces overwrites between versions
            },
        ]),
    ],

    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
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
            },
          },
        },
        minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: false,
              sourceMap: false, // set to true if you want JS source maps
              exclude: [/\.min\.js$/gi], // skip pre-minified libs
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
        ],
        runtimeChunk: {
            name: "manifest",
        },
        noEmitOnErrors: true
    },
})

