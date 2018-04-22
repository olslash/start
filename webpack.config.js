const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'dist/bundle.js'
  },
  module: {
    rules: [
      {
        include: __dirname + '/src',
        test: /\.js$/,
        use: { loader: 'babel-loader' }
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
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              alias: {
                resources: __dirname + '/resources'
              }
            }
          },
          // 'sass-loader'
        ]
      },
    ]
  },
  plugins: [new HTMLPlugin()]
};
