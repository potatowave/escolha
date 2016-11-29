"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../../models/Case');

function parseForm(formObject) {
  const newObject = { case: {}, objectives: [], alternatives: [], values: [] };

  newObject.case.name = formObject.casename;

  newObject.case.description = formObject.case_description;

  formObject.objectives.forEach((objective, index) => {
    const id_frontend = index;
    const name = objective.name;
    const sub_name = objective.sub_name;
    const evaluation_objective = '';
    const low_is_better = objective.low_is_better;
    const unit_name = '';
    const unit_prefix = objective.unit_prefix;
    const unit_suffix = objective.unit_suffix;
    const scale_type = objective.scale_type;

    const objectives = { id_frontend,
      name,
      sub_name,
      evaluation_objective,
      low_is_better,
      unit_name,
      unit_prefix,
      unit_suffix,
      scale_type };

    newObject.objectives.push(objectives);
  });

  formObject.alternatives.forEach((alternative, index) => {
    const id_frontend = index;
    const name = alternative.name;
    const image_url = alternative.image_url;

    const alternatives = { id_frontend,
      name,
      image_url };

    newObject.alternatives.push(alternatives);
  });


  formObject.objectives.forEach((objective, objectiveIndex) => {
    formObject.alternatives.forEach((alternative, alternativeIndex) => {
      const value = formObject.values[objectiveIndex][alternativeIndex];
      const objective_id_frontend = objectiveIndex;
      const alternative_id_frontend = alternativeIndex;

      const cells = { value,
        objective_id_frontend,
        alternative_id_frontend };

      newObject.values.push(cells);
    });
  });

  return newObject;
}

module.exports = (knex) => {

  /**
  * ROUTE: /api/cases/:id/values
  * Update a specific value
  */
  router.post("/:id/values", (req, res) => {
    const case_id = req.params.id
    const data    = parseForm(req.body);
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