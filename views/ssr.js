import React from 'react';
import PropTypes from 'prop-types';

// ----------------------

const Html = ({ helmet, scripts, window, css, children }) => (
  <html lang="en" prefix="og: http://ogp.me/ns#" {...helmet.htmlAttributes.toString()}>
    <head>
      {helmet.title.toComponent()}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {helmet.meta.toComponent()}
      {helmet.base.toString() ? helmet.base.toComponent() : <base href="/" />}
      <link rel="stylesheet" href={css} />
      <link rel="stylesheet" href="./assets/semantic.min.css"></link> 
      {/* <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link> */}
      {helmet.link.toComponent()}
      {helmet.style.toComponent()}
      {helmet.script.toComponent()}
      {helmet.noscript.toComponent()}
    </head>
    <body {...helmet.bodyAttributes.toComponent()}>
      <div id="content">{children}</div>  
      <script
        dangerouslySetInnerHTML={{
          __html: Object.keys(window).reduce(
            (out, key) => out += `window.${key}=${JSON.stringify(window[key])};`,
            '',
          ),
        }} />
      {scripts.map(src => <script key={src} src={src} />)}
    </body>
  </html>
);

Html.propTypes = {
  helmet: PropTypes.object.isRequired,
  window: PropTypes.object.isRequired,
  scripts: PropTypes.arrayOf(PropTypes.string).isRequired,
  css: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Html;