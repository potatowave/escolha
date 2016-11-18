// Required Frameworks

const express = require('express');
const bodyParser = require('body-parser');
const randString = require('./scripts/randomstring');
const pg = require('pg');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const connectionString = 'pg://development:development@localhost:5432/escolha';
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  .listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });

// Configuration

const PORT = process.env.PORT || 3001; // set to 3001
app.set('view engine', 'ejs'); // Set View Engine to ejs

const client = new pg.Client(connectionString);
client.connect();

app.use(express.static('public'));

app.get('/case', (req, res) => {
  const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query('' +

      'SELECT alternatives_objectives.*, ' +
      'alternatives.name AS alternative_name, ' +
      'objectives.name AS objective_name, ' +
      'objectives.sub_name AS objective_sub_name, ' +
      'alternatives.order AS alternative_order, ' +
      'objectives.low_is_better AS objective_low_is_better, ' +
      'objectives.unit_name, ' +
      'objectives.unit_prefix, ' +
      'objectives.unit_suffix ' +
      'FROM alternatives_objectives ' +
      'JOIN alternatives ON alternatives_objectives.alternative_id = alternatives.id ' +
      'JOIN objectives   ON alternatives_objectives.objective_id = objectives.id ' +
      'WHERE objectives.case_id = 1; ');

    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});

// Tell the console the server is running

app.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}!`);
});
