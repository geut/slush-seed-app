var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style/useable!css' // required to write 'require('./style.css') use and unuse'
    }, {
      test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }, {
      test: /\.gif$/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    }]
  }
};