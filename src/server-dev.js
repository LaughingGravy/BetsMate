const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const opn = require('opn');
const chalk = require('chalk');
const Config = require('../utilities/Config');
const webpackConfig = require('../webpack/webpack.dev.config');

const options = {
  contentBase: './dist',
  hot: true,
  host: Config.host,
  stats: { colors: true }
};

webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, options);

server.listen(Config.port, Config.host, (error) => {
  if (error) {
    console.log(chalk.red(error));
    return;
  }

  console.log(chalk.green(`Development server listening on port ${Config.port}`));
});

console.log(chalk.magentaBright('launching dev server...'));
opn(`http://${Config.host}:${Config.port}/index.html`, { app: 'chrome'});