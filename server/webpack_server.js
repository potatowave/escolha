"use strict";
const express = require('express');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const app = express();

// ----------------------------------------------------------------------------
// Webpack - Server

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
}).listen(3000, '0.0.0.0', (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log('Running at http://0.0.0.0:3000');
});