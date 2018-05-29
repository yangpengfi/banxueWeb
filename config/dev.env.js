'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.8.251/banxue/"',
  PREVIEW_URL: '"http://ow365.cn/?i=15549&furl="',
})
