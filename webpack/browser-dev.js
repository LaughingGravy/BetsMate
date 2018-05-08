import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import chalk from 'chalk'

import Config from '../utilities/Config'

import { css, stats } from './common'

export default new WebpackConfig().extend('[root]/browser.js').merge({
    mode: 'development',
    watch: true,
    devtool: 'cheap-module-eval-source-map',

    module: {
        rules: [
          // CSS loaders
          ...css.getDevLoaders(),
        ],
    },

    // Extra output options, specific to the dev server -- source maps and
    // our public path
    output: {
        publicPath: `${LOCAL}`,
    },

    plugins: [
        // Log to console when `webpack-dev-server` has finished
        {
            apply(compiler) {
            compiler.plugin('done', () => {
                logServerStarted({
                type: 'hot-reloading browser',
                host: Config.host,
                port: Config.port,
                chalk: chalk.bgMagenta.white,
                allowSSL: false,
                });
            });
            },
        },

        new webpack.NamedModulesPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        // Global variables
        new webpack.DefinePlugin({
            // We're running on the server
            SERVER: true,
            'process.env': {
            // Debug development
            NODE_ENV: JSON.stringify('development'),
            DEBUG: true,
            },
        }),
    ]
})