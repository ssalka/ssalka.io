import path from 'path';
import webpack, { Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const ROOT = path.resolve(__dirname);
const DIST = path.resolve('./dist');
const CLIENT = path.resolve('./src/client');

const config: Configuration = {
  context: ROOT,
  entry: ['./src/client/index.tsx'],
  output: {
    path: DIST,
    filename: 'client.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: CLIENT,
      loader: 'ts-loader',
      options: {
        configFile: path.resolve('./config/tsconfig.client.json')
      }
    }, {
      test: /\.scss$/,
      include: CLIENT,
      use: [
        'style-loader',
        'css-loader',
        'fast-sass-loader'
      ]
    }]
  },
  resolve: {
    alias: {
      src: path.resolve('./src')
    },
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: !['production', 'test'].includes(process.env.NODE_ENV)
    }),
    new CopyWebpackPlugin([
      { from: 'src/client/index.html' }
    ])
  ]
};

export default config;
