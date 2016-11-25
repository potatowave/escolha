"use strict";

require('dotenv').config();

const ENV = process.env.ENV || 'development';

const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const knexConfig = require('../knexfile.js');
const knex = require('knex')(knexConfig[ENV]);
// Required for passport
const bcrypt = require("bcrypt");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
// Models
const User = require('./models/User');

// ----------------------------------------------------------------------------
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Required for passport
app.use(session({ secret: '21321kdspakdpou9098776213$',resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Eanble CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ----------------------------------------------------------------------------
// API - Server

// Passport Strategy
passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      session: false
    },

  function(username, password, done) {
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
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User(knex).findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/', (req,res) => {
  res.send('Logged in!');
});

app.get('/login', (req,res) => {
  res.send('You need to login')
});

const authenticatedMiddleware = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.status(401).send('Not authenticated');
  }
  next();
};

// MUST be authenticated for access any /url in api
app.all("/api/*", authenticatedMiddleware);

// Routes
const apiCasesRoute = require('./routes/api/cases.js');
const apiUsersRoute = require('./routes/api/users.js');

app.use('/api/cases', apiCasesRoute(knex));
app.use('/api/users', apiUsersRoute(knex));

const PORT = process.env.PORT || 3001; // set to 3001
app.set('view engine', 'ejs'); // Set View Engine to ejs

app.use(express.static('public'));

// Tell the console the server is running
app.listen(PORT, () => {
  console.log(`Web Server listening on port ${PORT}!`);
});
