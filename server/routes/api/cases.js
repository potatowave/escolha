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







  /**
  * ROUTE: /api/cases/:case_id/objectives/:id
  * Delete a specific Objective
  */
  router.delete("/:case_id/objectives/:objective_id", (req, res) => {

    const caseId = req.params.case_id
    const objectiveId = req.params.objective_id

    Case(knex).deleteObjective(caseId, objectiveId, (data) => {
      res.json(data);
    })
  });


  /**
  * ROUTE: /api/cases/:case_id/alternatives/:id
  * Delete a specific Objective
  */
  router.delete("/:case_id/alternatives/:alternative_id", (req, res) => {

    const caseId = req.params.case_id
    const alternativeId = req.params.alternative_id

    Case(knex).deleteAlternative(caseId, alternativeId, (data) => {
      res.json(data);
    })
  });

  return router;
}