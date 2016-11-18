// Required Frameworks

const express = require('express');
const randStr = require('./randomstring');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration

const PORT = process.env.PORT || 3000; // default port 3000
app.set('view engine', 'ejs'); // Set View Engine to ejs

app.use(express.static('public'));


app.get('/', (req, res) => {
  res.redirect('urls/');
});

app.get('/register', (req, res) => {
  const templateVars = { urls: urlDatabase, userid: req.session.user_id };
  res.render('urls_register', templateVars);
});

// Tell the console the server is running

app.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}!`);
});
