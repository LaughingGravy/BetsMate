import webpack from 'webpack'
import WebpackConfig from 'webpack-config'

import ExtractTextPlugin from 'extract-text-webpack-plugin'

import { css } from './common'
import PATHS from '../utilities/paths'

const extractCSS = new ExtractTextPlugin({
    filename: 'assets/css/style.css',
    allChunks: true,
});

export default [
    // Server bundle
    new WebpackConfig().extend('[root]/dev.js', '[root]/server.js').merge({
        mode: 'development',
        watch: true,
        stats: 'none',

        entry: {
            javascript: [
            path.resolve(PATHS.entry, 'server-dev.js'),
            ],
        },

        output: {
            path: PATHS.dist,
            filename: 'server-dev.js',
        },

        plugins: [
            new webpack.DefinePlugin({
            // We ARE running on the server
            SERVER: true,
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                DEBUG: true,
            },
            }),
        ]
    }),

    // Browser bundle
    new WebpackConfig().extend('[root]/dev.js', '[root]/browser.js').merge({
        watch: true,
        stats: 'none',

        output: {
            path: PATHS.distDev,
            filename: '[name].js',
        },

        module: {
            rules: [
                // CSS loaders
                ...css.getExtractCSSLoaders(extractCSS, true /* sourceMaps = true */),
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                SERVER: true,
                'process.env': {   
                    NODE_ENV: JSON.stringify('development'),
                    DEBUG: true,
                },
            }),

            new webpack.NoEmitOnErrorsPlugin(),

            // Fire up CSS extraction
            extractCSS,

            // Copy files from `PATHS.static` to `dist/dev`.  No transformations
            // will be performed on the files-- they'll be copied as-is
            new CopyWebpackPlugin([
                {
                    from: PATHS.static,
                    force: true, // This flag forces overwrites between versions
                },
            ]),
        ],
    }),
]
