"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../models/Case');
const User    = require('../models/User');
const path    = require('path');

module.exports = (knex, passport) => {

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });

  router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/../public/landing_page.html'));
  });


  router.get('/signup', (req,res) => {
    res.sendFile(path.join(__dirname + '/../public/signup.html'));
  });

  router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
  });

  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/app',
      failureRedirect: '/login'
    })
  );

  /**
  * ROUTE: /api/users/signup
  * Create a new user (name, email, password)
  */
  router.post("/signup", (req, res) => {
    const user = req.body;

    User(knex).createUser(user, (message) => {
      res.json(message);
    })
  });

  return router;
}