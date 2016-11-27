"use strict";

require('dotenv').config();

const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3001; // set to 3001

const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig[ENV]);
const bcrypt = require("bcrypt");

// Required for passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

const authHelper = require('./helpers/auth')(knex);
const User = require('./models/User');

// ----------------------------------------------------------------------------
const app = express();
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport configuration. Intialize and also use session
app.use(session({ secret: 'R1sM6JmAo83mPZ1l1V8rRpoKla4F1vgv',resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Eanble CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'ejs'); // Set View Engine to ejs



// ----------------------------------------------------------------------------
// API - Server

// Passport Strategy - looking for a valid username and password
passport.use(new LocalStrategy(
  {usernameField: 'email', session: false},
  (username, password, done) => {
    User(knex).findOne(username, function(err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    })
  }
));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser(authHelper.myDeserialize);

// ----------------------------------------------------------------------------
// Unsecure routers

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});


app.get('/', (req,res) => {
  res.send('Logged in!');
});

app.get('/login', (req,res) => {
  res.send('You need to login')
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

// ----------------------------------------------------------------------------
// Protected routers - MUST be authenticated for access API

app.all("/api/*", authHelper.authenticatedMiddleware);

// Routes
const apiCasesRoute = require('./routes/api/cases.js');
const apiUsersRoute = require('./routes/api/users.js');

app.use('/api/cases', apiCasesRoute(knex));
app.use('/api/users', apiUsersRoute(knex));

// ----------------------------------------------------------------------------
// Starting the server

app.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}!`);
});
