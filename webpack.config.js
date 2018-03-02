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
      }
    ]
  },
  plugins: [new HTMLPlugin()]
};
