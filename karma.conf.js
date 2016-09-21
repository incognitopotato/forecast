var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*.js'
    ],
    preprocessors: {
      // add webpack as preprocessor
      'src/app/*.js': ['webpack', 'sourcemap'],
      'src/app/*.jsx': ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
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
            test: /\.json$/,
            loader: 'json',
          },
        ]
      },
      externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      },
      devServer: {
        stats: 'errors-only'
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-verbose-reporter'
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },

    reporters: ['verbose'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: false,
  })
};