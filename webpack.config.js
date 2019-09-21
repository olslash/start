/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['@babel/polyfill', './src/index.tsx'],
  output: {
    filename: 'dist/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
    alias: {
      resources: path.resolve(__dirname, 'resources'),
      start: path.resolve(__dirname, 'src')
    }
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        include: __dirname + '/src',
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        include: __dirname + '/src',
        test: /\.js$/,
        use: { loader: 'source-map-loader' },
        enforce: 'pre'
      },
      {
        include: __dirname + '/resources',
        test: /\.(gif|png|jpe?g|svg|ttf)$/i,
        use: { loader: 'url-loader' }
      },
      {
        include: __dirname + '/src',
        test: /\.scss$/,
        loaders: [
          'style-loader',

          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
              // alias: {a
              //   resources: __dirname + '/resources'
              // }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [new HTMLPlugin(), new webpack.WatchIgnorePlugin([/css\.d\.ts$/])]
};
