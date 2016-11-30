var path = require('path');
var webpack = require('webpack');

var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.jsx'
  ],
  output: {
    // path: path.join(__dirname, 'dist'), // This is the path where the bundle.js is actually written
    path: path.join(__dirname, 'public/assets/js'), // This is the path where the bundle.js is actually written when you run 'webpack' - this will put the production version of bundle.js in the proper folder.
    filename: 'bundle.js',
    publicPath: '/build/'// This is the config for where we want the dev server to pretend where the file is
  },
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
