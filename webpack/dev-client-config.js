'use strict'

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var Dotenv = require('dotenv-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var qs = require('qs');

var TEMPLATE = './src/index.html';
var INDEX = 'index.html';
var JSX_ENTRY_PATH = './src/assets/index.jsx';
var CSS_ENTRY_PATH = './src/assets/stylesheets/main.scss';
var OUTPUT_PATH = '../build';

var phaserModule = path.join(__dirname, '../node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  name: 'frontend-client',
  target: 'web',
  devtool: 'cheap-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      JSX_ENTRY_PATH,
      CSS_ENTRY_PATH,
    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader'],
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_PATH),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        // exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader',
        // exclude: /node_modules/,
        include: path.join(__dirname, '../src'),
      },
      {
        // IMPORTANT:
        // only use ExtractTextPlugin in prod - it doesn't support hot-reloading
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: 'images/[name].[ext]',
          },
        },
      },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
    ],
  },
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      phaser: phaser,
      pixi: pixi,
      p2: p2,
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ProgressBarPlugin({ clear: false }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new ExtractTextPlugin({
      filename: 'stylesheets/[name].bundle.css',
      allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new HtmlWebpackPlugin({
      filename: INDEX,
      template: TEMPLATE,
      chunks: ['vendor', 'app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false,
      },
      hash: false,
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
};
