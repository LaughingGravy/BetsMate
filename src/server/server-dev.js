import chalk from 'chalk'
import opn from 'opn'
import path from 'path'
import server from './server'
import PATHS from '../../utilities/paths'
const { ApolloEngine } = require('apollo-engine')

// import Config from '../../utilities/Config'
// import webpack from 'webpack';
// import webpackConfig from '../../webpack/webpack.dev.config'
// import webpackMiddleware from'webpack-dev-middleware'

// const app = server;

// const options = {
//   contentBase: '../../src/client',
//   host: Config.host,
//   stats: { colors: true }
// };

// const compiler = webpack(webpackConfig);

// app.use(webpackMiddleware(compiler, options));
// app.use(require("webpack-hot-middleware")(compiler));

// // return the site index page
// app.get('/*',function(req, res){//
//   res.sendFile(path.resolve(__dirname, '../../src/client') + '/index.html');
// });

// if (Config.isRunEngine)
// {
// // Initialize engine with your API key. Alternatively,
// // set the ENGINE_API_KEY environment variable when you
// // run your program.
//   const engine = new ApolloEngine({
//     apiKey: Config.apolloEngineServiceId,
//     sessionAuth: {
//       // Use the value of the 'session-id' cookie to isolate responses
//       // in the private full query cache from those from other sessions.
//       cookie: 'session-id',
//     }
//   })

//   // Handle error on Engine startup
//   engine.on('error', err => {
//     console.log(chalk.red.bold('There was an error starting the server or Engine.'));
//     console.error(err);

//     // The app failed to start, we probably want to kill the server
//     process.exit(1);
//   })

//   // start your engine!
//   engine.listen({
//     port: Config.port,
//     expressApp: server
//   }, () => {
//     console.log(chalk.green.bold(`Application listening on port ${Config.port}!\n`));
//   })
// }
// else {
//   // Serve the files.
//   app.listen(Config.port, () => {
//     console.log(chalk.green(`Application listening on port ${Config.port}!\n`));
//   })
// }

// console.log(chalk.magenta('launching dev server...'));
// opn(`http://${Config.host}:${Config.port}/index.html`, { app: 'chrome'});
