// Generates a client-only bundle.  For times when you don't want a full
// web server, or you need to host a static site.

import path from 'path';
import WebpackConfig from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import PATHS from '../utilities/paths';

export default new WebpackConfig().extend('[root]/browser-prod.js').merge({
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PATHS.views, 'browser.html'),
    }),
  ],
});
