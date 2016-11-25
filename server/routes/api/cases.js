"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../../models/Case');

module.exports = (knex) => {

  /**
  * ROUTE: /api/cases/:id/values
  * Update a specific value
  */
  router.post("/:id/values", (req, res) => {

    const case_id = req.params.id
    const data    = req.body;
    // Call the Model to interact with data
    Case(knex).updateCase(case_id, data, (msg) => {
      res.json(msg)
    });
  });

  /**
  * ROUTE: /api/cases
  * Add a full case
  */
  router.post("/", (req, res) => {
    //res.json('{ "oi": "alow"}');

    const data = req.body.data;
    // Call the Model to interact with data
    Case(knex).insertCase(data, (msg) => {
      res.json(msg);
    });
  });

  /**
  * ROUTE: /api/cases/:id
  * Update a specific case
  */
  router.put("/:id", (req, res) => {
    const case_id = req.params.id
    const data    = JSON.parse(req.body.data);

    // Call the Model to interact with data
    Case(knex).updateCase(case_id, data, (msg) => {
      res.send(msg)
    });
  });

  /**
  * ROUTE: /api/cases/:id
  * Read all information about a specific case
  */
  router.get("/:id", (req, res) => {
    const case_id = req.params.id
    Case(knex).deliverContent(case_id, (data) => {
      res.json(data);
    })
  });

  return router;
}
