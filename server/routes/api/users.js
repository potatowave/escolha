"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require("bcrypt");
const Case    = require('../../models/Case');
const User    = require('../../models/User');

module.exports = (knex) => {

  /**
  * ROUTE: /api/users/:id/cases
  * Return all cases that an user have
  */
  router.get("/:id/cases", (req, res) => {
    const user_id = req.params.id
    Case(knex).casesByUser((data) => {
      res.json(data);
    })
  });

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