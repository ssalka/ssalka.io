import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from 'webpack.dev.config';
import { expressPort, webpackPort } from './server/config';

// Start WDS for client-side hot reloading
new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  stats: 'errors-only',
  proxy: {
    '*': `http://localhost:${expressPort}`
  }
}).listen(webpackPort, 'localhost', err => {
  console.log(err || `[WDS] Running locally at: http://localhost:${webpackPort}\n`);
});
