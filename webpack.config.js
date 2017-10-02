const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),
  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'src'),
    historyApiFallback: true,
  },
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js',
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader'],
      include: [
        /src/,
        /node_modules\/viziaauth/,
      ],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }],
  },
  output:  {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebPackPlugin([{
      from: '../locales',
      to: 'locales',
    }]),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
    }),
    new webpack.EnvironmentPlugin({
      AUTH_AUDIENCE: 'brandwatch.com',
      AUTH_DOMAIN: 'https://auth-gateway.platform-stage.gcp0.bwcom.net/store',
      BW_DOMAIN: 'https://api.stage.brandwatch.net',
      LAUNCH_DARKLY_CLIENT_ID: '59c0fd9cb8a79d0ad1204815',
      MIXPANEL_TOKEN: null,
      NODE_ENV: null,
    }),
  ],
};
