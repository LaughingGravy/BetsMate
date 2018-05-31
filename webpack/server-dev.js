import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import path from 'path'
import chalk from 'chalk';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { webpackProgress } from './common'

import PATHS from '../utilities/paths'
import Config from '../utilities/Config'

export default [
    // Server bundle
    new WebpackConfig().extend('[root]/dev.js', '[root]/server.js').merge({
        mode: 'development',
        stats: 'minimal',

        // Production server entry point
        entry: {
            javascript: [
                path.resolve(PATHS.entry, 'server-dev.js')
            ], 
        },

        output: {
            path: PATHS.dist,
            filename: 'server-dev.js',
            globalObject: 'this'
        },

        plugins: [
            webpackProgress(
                `${chalk.magenta.bold('BetsMate server bundle')} in ${chalk.bgMagenta.white.bold('development mode')}`,
              ),

            new webpack.DefinePlugin({
            // We ARE running on the server
            SERVER: true,
            DEBUG: true,
            'process.env': {
                // Point the server host/port to the dev server
                HOST: JSON.stringify(Config.host),
                PORT: JSON.stringify(Config.port),
                SSL_PORT: Config.allowSSL ? JSON.stringify(Config.sslPort) : null,
        
                // React constantly checking process.env.NODE_ENV causes massive
                // slowdowns during rendering. Replacing process.env.NODE_ENV
                // with a string not only removes this expensive check, it allows
                // a minifier to remove all of React's warnings in production.
                NODE_ENV: JSON.stringify('development'),          
              },
            }),

            new webpack.HotModuleReplacementPlugin(),

            new webpack.NoEmitOnErrorsPlugin()
        ]
    }),
]
