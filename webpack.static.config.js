const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/static.js',
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
      test: /\.ejs$/,
      use: ['ejs-loader'],
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: true,
          },
        }, {
          loader: 'postcss-loader',
        }],
      }),
    }],
  },
  output: {
    filename: './assets/bundle.[chunkhash].min.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public',
    libraryTarget: 'umd',
  },
  plugins: [
    new CleanWebpackPlugin('public'),
    new ExtractTextPlugin({
      filename: './assets/bundle.[contenthash].min.css',
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: './assets',
    }]),
    new webpack.EnvironmentPlugin({
      AUTH_AUDIENCE: null,
      AUTH_DOMAIN: null,
      BW_DOMAIN: 'https://api.stage.brandwatch.net',
      LAUNCH_DARKLY_CLIENT_ID: '59c0fd9cb8a79d0ad1204816',
      MIXPANEL_TOKEN: null,
      NODE_ENV: null,
    }),
    new StaticSiteGeneratorPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
