import React from 'react'
import express from 'express'
import compression from 'compression'
import webpack from 'webpack'
//import webpackMiddleware from'webpack-dev-middleware'
import chalk from 'chalk'
import path from 'path'
import { ApolloEngine } from 'apollo-engine'
import { defaultOptions, getServerClient } from '../library/apolloClient/apollo'

// apollo graphql client
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { concat } from 'apollo-link'
import { StaticRouter } from 'react-router';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ErrorHandlerLink, getHttpLinkWithCookie } from '../library/apolloClient/links'
import App from '../src/client/components/App'
// React utility to transform JSX to HTML (to send back to the client)
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import Html from '../views/ssr';
import Html2 from '../views/ssr2';
import helmet from 'helmet';
import Helmet from 'react-helmet';
// For pre-pending a `<!DOCTYPE html>` stream to the server response
import { PassThrough } from 'stream';

import Config from '../utilities/Config';
import PATHS from '../utilities/paths'

import enGB from '../dist/dev/locales/en-GB.json';
import jaJP from '../dist/dev/locales/ja-JP.json';

// Extend the server base
import server, { createReactHandler, runApolloEngine, addLocalesRoutes, addFavicon } from './server-base';
//import { getServerClient } from '../library/apolloClient/apollo';

// Get manifest values
const css = 'assets/css/style.css';
const scripts = ['vendor.js', 'browser.js'];
const chunkManifest = {}

//Spawn the development server.
//Runs inside an immediate `async` block, to await listening on ports
//(async () => {
    const { app, listen } = server

    app.use(express.static(PATHS.distDev))
    app.use(compression()) 

    //addLocalesRoutes(app, enGB, jaJP)

    addFavicon(app, PATHS.distDev)

    app.get('/*', (req, res) => {

      const client = new ApolloClient({
        ssrMode: true,
        link: concat(ErrorHandlerLink, getHttpLinkWithCookie(req)),
        cache: new InMemoryCache({
            dataIdFromObject: object => object.id || null
          }),
          defaultOptions: defaultOptions
      })
        
      const context = {};
        
      // The client-side App will instead use <BrowserRouter>
      const components = (
        <ApolloProvider client={client}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      )
        
          // rendering code
          // getDataFromTree(components).then(() => {
          //   // We are ready to render for real
          //   const content = renderToString(components);
          //   const initialState = client.extract();
          
          //   const html = <MyHtml content={content} state={initialState} scripts={scripts} />;
          
          //   res.status(200);
          //   res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
          //   res.end();
          // }).
          // catch((err) => {
          //   console.log(err)
          // });

          getDataFromTree(components).then(() => {
            // We are ready to render for real
            const content = renderToString(components);
            const initialState = client.extract();
          
            const html = <MyHtml content={content} state={initialState} scripts={scripts} />;
          
            res.status(200);
            res.send(`<!doctype html>\n${renderToStaticMarkup(html)}`);
            res.end();
          }).
          catch((err) => {
            console.log(err)
          });

    })

    if (Config.isRunEngine) {
        runApolloEngine()
    }
    else {
        // Spawn the server
        //listen();

         console.log("listen on ", Config.port)
         app.listen(Config.port, (err) => {
             console.log(err)
         })
    }

//})

function MyHtml({ content, state, scripts }) {
    return (
      <html>
        <head>
        <meta charSet="UTF-8" />
        <base href="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />  
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
          }} />
          {scripts.map(src => <script key={src} src={src} />)}
        </body>
      </html>
    );
  }

// function getServerClient(req) {
//     return new ApolloClient({
//           ssrMode: true,
//           link: concat(ErrorHandlerLink, getHttpLinkWithCookie(req)),
//           cache: new InMemoryCache({
//               dataIdFromObject: object => object.id || null
//             }),
//             defaultOptions: defaultOptions
//       })
// }

    //app.use(webpackMiddleware(compiler, options));
   // app.use(require("webpack-hot-middleware")(compiler)); 
    
    // function createMyHandler(css = [], scripts = [], chunkManifest = {}) {
    //     return async function reactHandler(req, res) {
    //         const routeContext = {};

    //     const client = getClient(true);

    //     // // Generate the HTML from our React tree.  We're wrapping the result
    //     // // in `react-router`'s <StaticRouter> which will pull out URL info and
    //     // // store it in our empty `route` object
    //     const components = (
    //     <ApolloProvider client={client}>
    //         <StaticRouter location={req.url} context={routeContext}>    
    //             <App />    
    //         </StaticRouter>
    //     </ApolloProvider>
    //     )

    //     // // Wait for GraphQL data to be available in our initial render,
    //     // // before dumping HTML back to the client
    //     await getDataFromTree(components);

    //     // const content = ReactDOMServer.renderToString(components);

    //     // Create a HTML stream, to send back to the browser
    //     const htmlStream = new PassThrough();

    //     // Prefix the doctype, so the browser knows to expect HTML5
    //     htmlStream.write('<!DOCTYPE html>');

    //     const reactStream = ReactDOMServer.renderToNodeStream(
    //         <Html
    //             helmet={Helmet.renderStatic()}
    //             window={{
    //             webpackManifest: chunkManifest,
    //             __APOLLO_STATE__: client.extract(),
    //             }}
    //             css={css}
    //             scripts={scripts}>
    //             {components}
    //         </Html>,
    //     )

    //     // Pipe the React stream to the HTML output
    //     reactStream.pipe(htmlStream);

    //     res.status(200)
    //     res.type = 'text/html'
    //     res.body = htmlStream
    //     }
    // }




