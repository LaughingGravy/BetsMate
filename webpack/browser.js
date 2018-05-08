import path from 'path';
import webpack from 'webpack';
import WebpackConfig from 'webpack-config';

import PATHS from '../utilities/paths';

// Extend the 'base' config
export default new WebpackConfig().extend('[root]/base.js').merge({

    // This is where webpack will start crunching our source code
    entry: {
        // Client specific source code.  This is the stuff we write.
        browser: [
        // Entry point for the browser
        path.join(PATHS.entry, 'browser.js'),
        ],
        // Separate our third-party/vendor modules into a separate chunk, so that
        // we can load them independently of our app-specific code changes
        vendor: [
            'axios','prop-types','react','react-apollo','react-dom','react-helmet','react-intl-universal','react-router-dom',
            'semantic-ui-react'
        ],
    },

    // Set-up some common mocks/polyfills for features available in node, so
    // the browser doesn't balk when it sees this stuff
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },

    // Modules specific to our browser bundle
    module: {
        rules: [
            // .js(x) loading
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                {
                    loader: 'babel-loader',
                    query: {
                    // Ignore the .babelrc at the root of our project-- that's only
                    // used to compile our webpack settings, NOT for bundling
                    babelrc: false,
                    presets: [
                        ['env', {
                        // Enable tree-shaking by disabling commonJS transformation
                        modules: false,
                        // Exclude default regenerator-- we want to enable async/await
                        // so we'll do that with a dedicated plugin
                        exclude: ['transform-regenerator'],
                        targets: { browsers: ['last 2 versions'] },
                        }],               
                        // Transpile JSX code
                        'react', 'stage-2'
                    ],
                    plugins: [
                        'transform-regenerator',
                        'transform-decorators-legacy',
                    ],
                    },
                }],
            },
        ],
    },

    // optimization: {
    //     runtimeChunk: false,
    //     splitChunks: {
    //         chunks: "async",
    //         minSize: 30000,
    //         minChunks: 1,
    //         maxAsyncRequests: 5,
    //         maxInitialRequests: 3,
    //         name: true,
    //         cacheGroups: {
    //             default: {
    //             minChunks: 2,
    //             priority: -20,
    //             reuseExistingChunk: true,
    //             },
    //             commons: {
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10,
    //             name: 'vendor',
    //             chunks: 'all'
    //             }
    //         },
    //     }
    //   },
})