import webpack from 'webpack'
import WebpackConfig from 'webpack-config'
// Common config
import { regex, stats } from './common'

import PATHS from '../utilities/paths'

export default new WebpackConfig().merge({

    // Format the output stats to avoid too much noise
    stats,

    // Javascript file extensions that webpack will resolve
    resolve: {
        // I tend to use .js exclusively, but .jsx is also allowed
        extensions: ['.js', '.jsx'],

        // When we do an `import x from 'x'`, webpack will first look in our
        // root folder to try to resolve the package this.  This allows us to
        // short-hand imports without knowing the full/relative path.  If it
        // doesn't find anything, then it'll check `node_modules` as normal
        modules: [
            PATHS.src,
            PATHS.root,
            'node_modules',
        ],
    },

    module: {
        rules: [
          // Fonts
          {
            test: regex.fonts,
            loader: 'file-loader',
            query: {
              name: 'assets/fonts/[name].[hash].[ext]',
            },
          },

          {
            test: regex.images,
            use: [
                'file-loader',
                {
                  loader: 'image-webpack-loader',
                  query: {
                    name: '/assets/img/[name].[hash].[ext]',
                  },
                }
            ],
          },

          {
            test: regex.json,
            loader: 'json-loader',
            type: 'javascript/auto',
            query: {
              name: '/static/locales/[name].[hash].[ext]',
            },
          },

          // GraphQL queries
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader',
          },
    ]},

    // Output settings.  Where our files will wind up, and what we consider
    // to be the root public path for dev-server.
    // output: {

    //     // Our compiled bundles/static files will wind up in `dist/public`
    //     path: PATHS.public,

    //     // Deem the `dist` folder to be the root of our web server
    //     publicPath: '',

    //     // Filenames will simply be <name>.js
    //     filename: '[name].js',
    // },

    // plugins: [
    //     // Options that our module loaders will pull from
    //     new webpack.LoaderOptionsPlugin({
    
    //       // Switch loaders to `minimize mode` where possible
    //       minimize: true,
    
    //       // Turn off `debug mode` where possible
    //       debug: false,
    //       options: {
    //           // The 'context' that our loaders will use as the root folder
    //           context: PATHS.src,

    //             // image-webpack-loader image crunching options
    //             imageWebpackLoader: {
    //                 bypassOnDebug: true,
    //                 mozjpeg: {
    //                     progressive: true,
    //                     quality: 65
    //                 },
    //                 // optipng.enabled: false will disable optipng
    //                 optipng: {
    //                     enabled: false,
    //                 },
    //                 pngquant: {
    //                     quality: '65-90',
    //                     speed: 4
    //                 },
    //                 gifsicle: {
    //                     interlaced: false,
    //                 },
    //                 // the webp option will enable WEBP
    //                 webp: {
    //                     quality: 75
    //                 }
    //             }
    //         }
    //     }),
    // ],
})