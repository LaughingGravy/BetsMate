import WebpackConfig from 'webpack-config';

// ----------------------

export default new WebpackConfig().merge({
  // Add source maps
  devtool: 'cheap-module-eval-source-map',
});