import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import path from 'path'
import chalk from 'chalk';
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import PATHS from '../utilities/paths'

export default [
    // Server bundle
    new WebpackConfig().extend('[root]/dev.js', '[root]/server.js').merge({
        mode: 'development',
        //watch: true,
        //stats: 'none',
        devtool: 'source-map',

        // Production server entry point
        entry: {
            javascript: [
                path.resolve(PATHS.entry, 'ssrserver.js'),
            ],
        },

        output: {
            path: PATHS.dist,
            filename: 'server-ssr.js',
            publicPath: '/dist/',
        },

        plugins: [

            new webpack.DefinePlugin({
            // We ARE running on the server
            SERVER: true,
            'process.env': {
                // Point the server host/port to the dev server
                HOST: JSON.stringify(process.env.HOST || 'localhost'),
                PORT: JSON.stringify(process.env.PORT || '3000'),
                SSL_PORT: process.env.SSL_PORT ? JSON.stringify(process.env.SSL_PORT) : null,
        
                // React constantly checking process.env.NODE_ENV causes massive
                // slowdowns during rendering. Replacing process.env.NODE_ENV
                // with a string not only removes this expensive check, it allows
                // a minifier to remove all of React's warnings in production.
                NODE_ENV: JSON.stringify('development'),
                DEBUG: true,
              },
            }),

            new webpack.HotModuleReplacementPlugin(),

            new webpack.NoEmitOnErrorsPlugin()
        ]
    }),
]