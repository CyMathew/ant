const path = require('path');

module.exports = {
  entry: './src/app.js',

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }]
  }
};