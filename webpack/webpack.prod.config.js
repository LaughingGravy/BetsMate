const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

// Our local path configuration, so webpack knows where everything is/goes
const PATHS = require('../utilities/paths');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// Compression plugin for generating `.gz` static files
const CompressionPlugin = require("compression-webpack-plugin")
// Generate .br files, using the Brotli compression algorithm
const BrotliPlugin = require('brotli-webpack-plugin');
// Chunk Manifest plugin for generating a chunk asset manifest
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// Copy files from `PATH.static` to `PATHS.public`
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = merge(common, {
  entry: {
    vendor: [
      'axios','prop-types','react','react-apollo','react-dom','react-helmet','react-intl-universal','react-router-dom',
      'semantic-ui-react'
    ],
    app: [PATHS.client + '/index.js']
   },
   mode: 'production',
   devtool: 'source-map',
   plugins: [
    new CleanWebpackPlugin( ['dist'], { 
                                        root: PATHS.root, 
                                        dry: false, 
                                        verbose: true
                                      } ),

     new UglifyJSPlugin({
        test: /\.js($|\?)/i,
        include: /\/src/,
        parallel: true,
        sourceMap: true,
        exclude: [/\.min\.js$/gi], // skip pre-minified libs
      }),
      
      // A plugin for a more aggressive chunk merging strategy
      new webpack.optimize.AggressiveMergingPlugin(),
      
      // Generate chunk manifest
      new ChunkManifestPlugin({
        // Put this in `dist` rather than `dist/public`
        filename: './chunk-manifest.json',
        manifestVariable: 'webpackManifest',
      }),

      // Generate assets manifest
      new ManifestPlugin({
        // Put this in `dist` rather than `dist/public`
        fileName: './manifest.json',
        // Prefix assets with '/' so that they can be referenced from any route
        publicPath: '',
        inlineManifest: true,
      }),

      // Compress assets into .gz files
      new CompressionPlugin({
        test: /\.js/,
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        minRatio: 0.99
      }),

      // Also generate .br files, with Brotli compression-- often significantly
      // smaller than the gzip equivalent, but not yet universally supported
      new BrotliPlugin({
        // Overwrite the default 80% compression-- anything is better than
        // nothing
        minRatio: 0.99,
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      // Copy files from `PATHS.static` to `dist/public`.  No transformations
      // will be performed on the files-- they'll be copied as-is
      new CopyWebpackPlugin([
        {
          from: PATHS.static,
          to: PATHS.dist,
          force: true, // This flag forces overwrites between versions
        },
      ]),

      // Enable scope hoisting to speed up JS loading
    new webpack.optimize.ModuleConcatenationPlugin(),

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
});