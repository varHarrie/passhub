const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'electron-renderer',
  entry: {
    renderer: './src/renderer.ts'
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: ['file-loader', { loader: 'url-loader', options: { limit: 8192 } }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Passhub'
    }),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, '..', 'public')
      }
    ])
  ]
}
