var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API:'"/api"'
  BASE_API: '"http://172.16.100.42:8080/BDEMMSys"'
})
