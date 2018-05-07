import webpack from 'webpack';
import WebpackConfig from 'webpack-config';
import chalk from 'chalk';
import path from 'path';

// Plugins
import CleanWebpackPlugin from 'clean-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
// Compression plugin for generating `.gz` static files
import CompressionPlugin from 'compression-webpack-plugin'
// Generate .br files, using the Brotli compression algorithm
import BrotliPlugin from 'brotli-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'
// Chunk Manifest plugin for generating a chunk asset manifest
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'
// Copy files from `PATH.static` to `PATHS.public`
import CopyWebpackPlugin from 'copy-webpack-plugin'
// css extractor
import ExtractTextPlugin from 'extract-text-webpack-plugin'
// Bundle Analyzer plugin for viewing interactive treemap of bundle
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { regex, css, webpackProgress } from './common';
import PATHS from '../utilities/paths';

const extractCSS = new ExtractTextPlugin({
    filename: 'assets/css/style.[chunkhash].css',
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
    mode: 'production',

    output: {
        // Filenames will be <name>.<chunkhash>.js in production on the browser
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
    },

    module: {
        rules: [
          // CSS loaders
          ...css.getExtractCSSLoaders(extractCSS),
        ],
      },

    plugins: [
        webpackProgress(
            `${chalk.magenta.bold('Betsmate browser bundle')} in ${chalk.bgMagenta.white.bold('production mode')}`,
        ),

        new webpack.NoEmitOnErrorsPlugin(),

        new UglifyJSPlugin({
            parallel: true,
            sourceMap: true,
            exclude: [/\.min\.js$/gi], // skip pre-minified libs
        }),

        // A plugin for a more aggressive chunk merging strategy
        new webpack.optimize.AggressiveMergingPlugin(),

        // Compress assets into .gz files
        new CompressionPlugin({
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

        // Fire up CSS extraction
        extractCSS,

        // Extract webpack bootstrap logic into a separate file
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest',
        //     minChunks: Infinity,
        // }),

        // Map hash to module id
        new webpack.HashedModuleIdsPlugin(),

        // Compute chunk hash
        new WebpackChunkHash(),

        // Generate chunk manifest
        new ChunkManifestPlugin({
            // Put this in `dist` rather than `dist/public`
            filename: '../chunk-manifest.json',
            manifestVariable: 'webpackManifest',
        }),

        // Generate assets manifest
        new ManifestPlugin({
            // Put this in `dist` rather than `dist/public`
            fileName: '../manifest.json',
            // Prefix assets with '/' so that they can be referenced from any route
            publicPath: '',
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

        // Global variables
        new webpack.DefinePlugin({
            // We're running on the server
            SERVER: true,
            'process.env': {
            // Debug development
            NODE_ENV: JSON.stringify('production'),
            DEBUG: false,
            },
        }),
    ],
    optimization: {
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