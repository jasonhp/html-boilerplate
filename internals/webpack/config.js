'use strict'
const path = require('path')
const pullAll = require('lodash/pullAll')
const uniq = require('lodash/uniq')
const pkg = require('../../package')

module.exports = {
  lang: ['zh'],
  dllPlugin: {
    defaults: {
      /**
       * we need to exclude dependencies which are not intended for the browser
       * by listing them here.
       */
      exclude: [
        'chalk',
        'compression',
        'cross-env',
        'express',
        'ip',
        'minimist',
        'sanitize.css',
      ],

      /**
       * Specify any additional dependencies here. We include core-js and lodash
       * since a lot of our dependencies depend on them and they get picked up by webpack.
       */
      include: ['eventsource-polyfill', 'lodash'],

      // The path where the DLL manifest and bundle will get built
      path: path.resolve(process.cwd(), 'dlls'),
      manifestPath: path.resolve(process.cwd(), 'dlls/manifest.json'),
    },

    entry() {
      const dependencyNames = Object.keys(pkg.dependencies)
      const exclude = module.exports.dllPlugin.defaults.exclude
      const include = module.exports.dllPlugin.defaults.include
      const includeDependencies = uniq(dependencyNames.concat(include))

      return {
        dependencies: pullAll(includeDependencies, exclude),
      }
    },
  },
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // Source Maps
    devtool: 'cheap-module-eval-source-map',

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(process.cwd(), 'dist/index.html'),

    // Paths
    assetsRoot: path.resolve(process.cwd(), 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
}