// Required Frameworks

const express = require('express');
const bodyParser = require('body-parser');
const randString = require('./scripts/randomstring');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   watchOptions: {
//     aggregateTimeout: 300,
//     poll: 1000,
//   },
// })
//   .listen(3000, '0.0.0.0', (err, result) => {
//     if (err) {
//       console.log(err);
//     }

//     console.log('Running at http://0.0.0.0:3000');
//   });

// ----------------------------------------------------------------------------
// API - Configuration

const apiCasesRoute = require("./routes/api/cases.js");

const PORT = process.env.PORT || 3001; // set to 3001
app.set('view engine', 'ejs'); // Set View Engine to ejs


app.use(express.static('public'));

app.use("/api/cases", apiCasesRoute);

// Tell the console the server is running

app.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}!`);
});
