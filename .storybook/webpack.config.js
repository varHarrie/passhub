const webpack = require('webpack')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader')
  })

  config.plugins.push(
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  )

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
