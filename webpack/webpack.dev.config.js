import path from 'path';
import merge from 'webpack-merge';
import common from '../webpack/webpack.common.config';
import webpack from 'webpack';

import PATHS from '../utilities/paths';

 module.exports = merge(common, {
    mode: 'development',
    entry: {
        vendor: [
          'axios','prop-types','react','react-apollo','react-dom','react-helmet','react-intl-universal','react-router-dom',
          'semantic-ui-react','webpack-hot-middleware/client'
        ],
        app: [ PATHS.client + '/index.js', 'webpack-hot-middleware/client' ]
     },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
});