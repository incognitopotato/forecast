var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'babel-polyfill',
    './app/main.scss',
    './app/prod.js'
  ],
  output: {
      path: './dist/',
      filename: 'main.js',
      publicPath: '/static/',
  },
  plugins: [
    new ExtractTextPlugin("style.css", {allChunks: false}),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      ENV: JSON.stringify('PRODUCTION')
    }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        loader: 'stylelint',
        exclude: /node_modules/
      }
    ],
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
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  stylelint: {
    configFile: './.stylelintrc'
  },
  jshint: {
    emitErrors: true,
    failOnHint: false,
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
