const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./renderer.base.config')

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  devServer: {
    port: 2333,
    compress: true,
    inline: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
})
