import chalk from 'chalk';
import opn from 'opn';
import server from './server';
const { ApolloEngine } = require('apollo-engine');

import Config from '../../utilities/Config';
import webpack from 'webpack';
import webpackConfig from '../../webpack/webpack.dev.config';
import webpackMiddleware from'webpack-dev-middleware';

const app = server;

const options = {
  contentBase: './dist',
  host: Config.host,
  stats: { colors: true }
};

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, options));
app.use(require("webpack-hot-middleware")(compiler));

// Initialize engine with your API key. Alternatively,
// set the ENGINE_API_KEY environment variable when you
// run your program.
const engine = new ApolloEngine({
  apiKey: Config.apolloEngineServiceId
});

engine.listen({
  port: Config.port,
  expressApp: server
}, () => {
  console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
  console.log(chalk.green(`Apollo Engine running!\n`));
});

// Serve the files on port 3000.
// app.listen(Config.port, () => {
//   console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
// });



console.log(chalk.magenta('launching dev server...'));
opn(`http://${Config.host}:${Config.port}/index.html`, { app: 'chrome'});
