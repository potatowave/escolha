"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../../models/User');

module.exports = (knex) => {

  /**
  * ROUTE: /api/users/me
  * Return information about the logged in user
  */
  router.get("/me", (req, res) => {
    const userId = req.session.passport.user;
    Case(knex).userInfomation(userId, (error, user) => res.json(user));
  });

  return router;
}