const merge = require('webpack-merge')

const devConfig = require('./main.dev.config')

module.exports = merge.smart(devConfig, {
  mode: 'production'
})
