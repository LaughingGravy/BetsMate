const chalk = require('chalk');
const Config = require('../../utilities/Config');
const opn = require('opn');
const server = require('./server');

const webpack = require('webpack');
const webpackConfig = require('../../webpack/webpack.dev.config');
const webpackMiddleware = require ('webpack-dev-middleware');

const app = server;

const options = {
  contentBase: './dist',
  host: Config.host,
  stats: { colors: true }
};

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, options));
app.use(require("webpack-hot-middleware")(compiler));

// Serve the files on port 3000.
app.listen(Config.port, () => {
  console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
});

console.log(chalk.magenta('launching dev server...'));
opn(`http://${Config.host}:${Config.port}/index.html`, { app: 'chrome'});
