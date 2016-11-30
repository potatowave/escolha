var path = require('path');
var webpack = require('webpack');
var WriteFilePlugin = require('write-file-webpack-plugin');


var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = {
  devServer: {
    outputPath: path.join(__dirname, './public/assets/js'),
    // outputPath: path.join(__dirname, './dist'),
    // filename: 'bundle.js',
    // publicPath: '/build/'
  },
  output: {
    path: path.join(__dirname, './public/assets/js'),
    // filename: 'bundle.js',
    // publicPath: '/build/'
    // publicPath: '/server/public/assets/js/'
  },
  plugins: [
      new WriteFilePlugin()
  ],
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.jsx'
  ],
  module: {
    loaders: [

      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
        }
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ }
    ]
  },
    resolve: {
    extensions: ['', '.js', '.jsx'],
    resolve: {alias: alias},
  },
}
