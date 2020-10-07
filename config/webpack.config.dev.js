// Must set this before running anything else
process.env.NODE_ENV = 'development';

// webpack 2 version

const readFileSync = require('fs').readFileSync;
const paths = require('./paths');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let plugins = [
  // this gives the compiled codebase access to process.env.NODE_ENV
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new webpack.optimize.UglifyJsPlugin({
    beautify: true,
    mangle: false,
    sourceMap: false,
    comments: false
  }),
  new ExtractTextPlugin('css.css')
];

module.exports = {
  entry: {
    index: ['./src/index.js', './src/css/main.scss']
  },
  resolve: {
    extensions: ['.js', '.html']
  },
  output: {
    path: paths.appBuild,
    filename: 'bundle.js',
    chunkFilename: '[name].[id].js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: paths.appSrc,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  devServer: {
    contentBase: paths.appBuild, 
    inline: true,
    watchContentBase: true,
    port: 9000
  },
  devtool: 'inline-source-map'
};
