'use strict'

const path = require('path')
const { DefinePlugin, ProvidePlugin } = require('webpack')

const {production} = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))

module.exports = {
  entry: {
    app: [path.resolve(__dirname, '../src/targets/mobile/main')]
  },
  output: {
    path: path.resolve(__dirname, '../mobile/www'),
    filename: '[name].js'
  },
  plugins: [
    new DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __SENTRY_TOKEN__: JSON.stringify('29bd1255b6d544a1b65435a634c9ff67'),
      __DEVMODE__: !production,
      __APP_VERSION__: JSON.stringify(pkg.version)
    }),
    new ProvidePlugin({
      'PouchDB': 'pouchdb',
      'pouchdbFind': 'pouchdb-find',
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.mobile.js'
    })
  ]
}
