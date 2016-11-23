"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../../models/Case');

module.exports = (knex) => {

  /**
  * ROUTE: /api/users/:id/cases
  * Read all information about a specific case
  */
  router.get("/:id/cases", (req, res) => {
    const user_id = req.params.id
    Case(knex).casesByUser((data) => {
      res.json(data);
    })
  });

  return router;
}
