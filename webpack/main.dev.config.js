const merge = require('webpack-merge')

const baseConfig = require('./main.base.config')

module.exports = merge.smart(baseConfig, {
  mode: 'development'
})
