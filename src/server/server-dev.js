//const webpackDevServer = require('webpack-dev-server');
const PATHS = require('../../utilities/paths');
const path = require('path');
const webpack = require('webpack');
const opn = require('opn');
const chalk = require('chalk');
const Config = require('../../utilities/Config');
const webpackConfig = require('../../webpack/webpack.dev.config');
const favicon = require('serve-favicon');
const express = require('express');

const webpackMiddleware = require ('webpack-dev-middleware');
const app = express();


const options = {
  contentBase: './dist',
  hot: true,
  host: Config.host,
  stats: { colors: true }
};

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, options));

//app.use(webpackMiddleware(compiler));

app.use(favicon(path.resolve(PATHS.static, 'favicon.ico')));

// Serve the files on port 3000.
app.listen(Config.port, () => {
  console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
});

console.log(chalk.magentaBright('launching dev server...'));
opn(`http://${Config.host}:${Config.port}/index.html`, { app: 'chrome'});


// const options = {
//   contentBase: './dist',
//   hot: true,
//   host: Config.host,
//   stats: { colors: true }
// };

// webpackDevServer.addDevServerEntrypoints(webpackConfig, options);
// const compiler = webpack(webpackConfig);
// const server = new webpackDevServer(compiler, options);

// server.listen(Config.port, Config.host, (error) => {
//   if (error) {
//     console.log(chalk.red(error));
//     return;
//   }

//   console.log(chalk.green(`Development server listening on port ${Config.port}`));
// });

// console.log(chalk.magentaBright('launching dev server...'));
// opn(`http://${Config.host}:${Config.port}/index.html`, { app: 'chrome'});