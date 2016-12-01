"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../../models/Case');
const helper  = require('../../helpers/parseForm');

module.exports = (knex) => {

  /**
  * ROUTE: /api/cases
  * Return all cases that an user have
  */
  router.get("/", (req, res) => {
    const userId = req.session.passport.user;
    Case(knex).casesByUser(userId, (data) => res.json(data));
  });

  /**
  * ROUTE: /api/cases
  * Add a full case
  */
  router.post("/", (req, res) => {
    const userId = req.session.passport.user;
    let data = req.body.data;
    data = helper(knex).parseForm(data);

    Case(knex).insertCase(userId, data,
      (msg) => res.json(msg)
    );
  });

  /**
  * ROUTE: /api/cases/:id/values
  * Update a specific value
  */
  router.post("/:id/values", (req, res) => {
    const userId  = req.session.passport.user;
    const caseId  = req.params.id
    const data    = req.body;

    Case(knex).updateCase(userId, caseId, data, (msg) => res.json(msg));
  });

  /**
  * ROUTE: /api/cases/:id
  * Read all information about a specific case
  */
  router.get("/:id", (req, res) => {
    const userId  = req.session.passport.user;
    const caseId = req.params.id

    Case(knex).deliverContent(userId, caseId, (data) => {
      res.json(data);
    })
  });

  /**
  * ROUTE: /api/cases/:id/alternatives/hide
  * Hide an array of alternatives
  */
  router.post("/:id/alternatives/hide", (req, res) => {
    const caseId  = req.params.id;
    const data    = req.body.data;

    Case(knex).hideAlternatives(caseId, data, (msg) => res.json(msg));
  });

  /**
  * ROUTE: /api/cases/:id/objectives/hide
  * Hide an array of objectives
  */
  router.post("/:id/objectives/hide", (req, res) => {
    const caseId  = req.params.id;
    const data    = req.body.data;

    Case(knex).hideObjectives(caseId, data, (msg) => res.json(msg));
  });

  /**
  * ROUTE: /api/cases/:id/objectives/order
  * Re-order objectives
  */
  router.post("/:id/objectives/order", (req, res) => {
    const caseId  = req.params.id;
    const data    = req.body.data;

    Case(knex).orderObjectives(caseId, data, (msg) => res.json(msg));
  });

  /**
  * ROUTE: /api/cases/:id/
  * Delete a case
  */
  router.delete("/:id", (req, res) => {
    const userId = req.session.passport.user;
    const caseId = req.params.id;

    Case(knex).deleteCase(userId, caseId, (msg) => res.json(msg));
  });

  return router;
}