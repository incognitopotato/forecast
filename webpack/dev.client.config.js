var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './styles/main.scss',
    './app/index.js',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'main.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'airbnb']
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'airbnb']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "autoprefixer", "sass?sourceMap"]
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  devServer: {
    contentBase: "./app",
    stats: 'errors-only'
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
