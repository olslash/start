const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.js',
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
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: { loader: 'url-loader' }
      }
    ]
  },
  plugins: [new HTMLPlugin()]
};
