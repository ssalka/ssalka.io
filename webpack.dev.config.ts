import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import webpack, { Configuration } from 'webpack';

import { webpackPort } from 'src/server/config';
import config from './webpack.config';

const devConfig: Configuration = {
  ...config,
  mode: 'development',
  devtool: 'source-map'
};

(devConfig.entry as string[]).unshift(
  `webpack-dev-server/client?http://localhost:${webpackPort}/`,
  'webpack/hot/dev-server'
);

(devConfig.module.rules[0].options as Record<string, any>).transpileOnly = true;

devConfig.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: './config/tsconfig.client.json',
    tslint: './config/tslint.json'
  })
);

export default devConfig;
