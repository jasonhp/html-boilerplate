'use strict'

const webpack = require('webpack')
const path = require('path')

const config = require('./config')
const utils = require('./utils')

module.exports = {
  mode: 'development',
  context: process.cwd(),
  output: {
    path: config.build.assetsRoot,
    publicPath: '/',
  },
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.json'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      '~App': path.resolve(__dirname, 'app/'),
      '~Assets': path.resolve(__dirname, 'app/assets/'),
    },
  },
  entry: {
    'mob-detect': path.join(
      process.cwd(),
      'app/components/common/mob-detect.js',
    ),
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-loader',
        },
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              name: utils.assetsPath('img/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: {},
}
