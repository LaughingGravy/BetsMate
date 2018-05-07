import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
import chalk from 'chalk'

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
    plugins: [
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