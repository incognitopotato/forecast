var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './app/main.scss',
    './app/index.jsx',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
  ],
  debug: true,
  devtool: 'source-map',
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
        include: /style/
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
        loaders: ["style", "css?sourceMap", "autoprefixer", "sass?sourceMap"]
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
