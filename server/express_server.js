

require('dotenv').config();

const ENV = process.env.ENV || 'development';

const express = require('express');
const bodyParser = require('body-parser');
const randString = require('./scripts/randomstring');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig[ENV]);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

// ----------------------------------------------------------------------------
// API - Server

// Routes
const apiCasesRoute = require('./routes/api/cases.js');

app.use('/api/cases', apiCasesRoute(knex));

const PORT = process.env.PORT || 3001; // set to 3001
app.set('view engine', 'ejs'); // Set View Engine to ejs

app.use(express.static('public'));

// Tell the console the server is running
app.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}!`);
});
