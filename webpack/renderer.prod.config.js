const merge = require('webpack-merge')

const baseConfig = require('./renderer.base.config')

module.exports = merge.smart(baseConfig, {
  mode: 'production'
})
