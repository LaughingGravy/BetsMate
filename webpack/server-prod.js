import path from 'path'
import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import chalk from 'chalk'
import Config from '../utilities/Config'

import { webpackProgress } from './common'
import PATHS from '../utilities/paths'

export default new WebpackConfig().extend({
    '[root]/server.js': conf => {
      // Optimise images
        conf.module.rules.find(l => l.test.toString() === /\.(jpe?g|png|gif|svg)$/i.toString())
            .use.push({
            // `image-webpack-loader` is used on the server build even with `emitFile`
            // on `fileLoader` disabled so that the correct hash can be generated.
            loader: 'image-webpack-loader',
            // workaround for https://github.com/tcoopman/image-webpack-loader/issues/88
            options: {},
            });
        return conf;
    },
}).merge({
    mode: 'none', // optimizations when set to production cause errors - we will set appropriate optimizations 
    stats: 'minimal',

    // Production server entry point
    entry: {
        javascript: [
            path.resolve(PATHS.entry, 'server-prod.js'),
        ],
    },

    output: {
        path: PATHS.dist,
        filename: 'server.js',
        globalObject: 'this'
    },

    plugins: [
        webpackProgress(
          `${chalk.magenta.bold('BetsMate server bundle')} in ${chalk.bgMagenta.white.bold('production')}`,
        ),

        new webpack.DefinePlugin({
            'process.env': {
            HOST: JSON.stringify(Config.host),
            PORT: JSON.stringify(Config.port),
            SSL_PORT: Config.allowSSL ? JSON.stringify(Config.sslPort) : null,
            NODE_ENV: JSON.stringify('production'),
            SERVER: true,
            DEBUG: false,
            },
        }),
    ],
})
