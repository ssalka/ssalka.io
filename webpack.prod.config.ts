import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import config from './webpack.config';

const prodConfig = {
  ...config,
  mode: 'production'
};

prodConfig.optimization = {
  minimizer: [
    new UglifyJsPlugin()
  ]
};

export default prodConfig;
