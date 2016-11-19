"use strict";

const express = require('express');
const router  = express.Router();
//const pg = require('pg');
//const connectionString = 'pg://development:development@localhost:5432/development';
//const client = new pg.Client(connectionString);
//client.connect();

/*
  router.get("/", (req, res) => {

      const results = [];
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err });
    }
    // SQL Query > Select Data
    const query = client.query(

      'SELECT * FROM ( ' +
        'SELECT DISTINCT ON (alternatives_objectives.objective_id) ' +
      'alternatives_objectives.objective_id, ' +

      'objectives.name     AS objective_name, ' +
      'objectives.sub_name   AS objective_sub_name, ' +
      'objectives.order    AS objective_order, ' +

      'objectives.evaluation_objective AS objective_evaluation_object, ' +
      'objectives.low_is_better AS objective_low_is_better, ' +
      'objectives.unit_name, ' +
      'objectives.unit_prefix, ' +
      'objectives.unit_suffix ' +

      'FROM alternatives_objectives ' +
        'JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id ' +
        'JOIN objectives     ON alternatives_objectives.objective_id    = objectives.id ' +

       'WHERE objectives.case_id = 1 ' +
        ') tab1 ' +

         'JOIN ( ' +

        'SELECT ' +
          'array_agg(alternative_id) AS alternatives_ids, ' +
          'array_agg(alternative_order) AS alternatives_orders, ' +
          'array_agg(value) AS values, ' +
          'array_agg(alternative_name) AS alternative_names, ' +
          'objective_id ' +
        'FROM ( ' +
        '  SELECT ' +
            'alternatives_objectives.*, ' +

            'alternatives.name AS alternative_name, ' +
            'objectives.name AS objective_name, ' +
            'objectives.sub_name AS objective_sub_name, ' +

            'alternatives.order AS alternative_order, ' +
            'objectives.order AS objective_order, ' +

            'objectives.evaluation_objective AS objective_evaluation_object, ' +
            'objectives.low_is_better AS objective_low_is_better, ' +
            'objectives.unit_name, ' +
            'objectives.unit_prefix, ' +
            'objectives.unit_suffix ' +

          'FROM alternatives_objectives ' +
          'JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id ' +
          'JOIN objectives     ON alternatives_objectives.objective_id     = objectives.id ' +

          'WHERE objectives.case_id = 1 ' +
        ') as matrix ' +

        'GROUP BY matrix.objective_id ' +

    ') as tab2 ' +

 'ON tab1.objective_id = tab2.objective_id'

      );
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });


  });
  */

module.exports = (knex) => {

  const user_id       = 1;

  // Tracking the aSync count of rows inserted into database
  let totalObjectives;
  let totalAlternatives;

  // Mapping id from front-end to database id in order to be able to add values
  // Format should be: [idFrontEnd, idBackEnd]
  let objectivesMap       = [];
  let alternativesMap     = [];


  /**
  * Checking if Alternatives AND objectives were ALL added
  * @return {object} objective - All informations about the objective
  */
  function isDoneInserting() {
    // Just console log if ALL the alternatives is added to database
    if ((alternativesMap.length == totalAlternatives) && (objectivesMap.length == totalObjectives)) {
      return true;
    }

    return false;
  }

  /**
  * Insert values into database
  * @param {object}   values    - all cell values data from frontend
  */

  function insertValues(values) {

    console.log("Now I can add the values in here!");
    console.log(values);

    /*
    knex.insert({
      alternative_id: alternative_id,
      objective_id:   objective_id,
      value:          value
    })
    .into('alternatives_objectives')
    .then( (objective_id) => {

    })
    .catch(function(error) { console.error(error); });
    */
  }


  /**
  * Insert an objetive into database
  * @param {object}   objective - All informations about the objective
  * @param {integer}  case_id   - To which course objective belongs
  * @param {object}   values    - all cell values data from frontend
  */

  function insertObjective(objective, case_id, order, values) {

    knex.insert({
      name:                   objective.objective,
      sub_name:               objective.subObjective,
      case_id:                parseInt(case_id),
      evaluation_objective:   objective.criterion,
      low_is_better:          objective.low_is_better,
      order:                  parseInt(order),
      unit_name:              objective.unit_name,
      unit_prefix:            objective.unit_prefix,
      unit_suffix:            objective.unit_suffix,
    }, 'id')
    .into('objectives')
    .then( (objective_id) => {

      // Maping id_front-end to the new id from database
      objectivesMap.push([objective.id_frontend, objective_id[0]]);

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        insertValues(values)
      }
    })
    .catch(function(error) { console.error(error); });
  }

  /**
  * Insert an alternative to database
  * @param {object} objective - All informations about the objective
  * @param {integer} case_id  - To which course objective belongs
  * @param {object}   values    - all cell values data from frontend
  */
  function insertAlternative(alternative, case_id, order, values) {

    knex.insert({
      case_id:                parseInt(case_id),
      name:                   alternative.name,
      image_url:              alternative.image_url,
      order:                  parseInt(order),
    }, 'id')
    .into('alternatives')
    .then( (alternative_id) => {

      // Maping id_front-end to the new id from database
      alternativesMap.push([alternative.id_frontend, alternative_id[0]]);

      // Insert to alternatives_objectives only if all other data is alredy
      // inserted
      if (isDoneInserting()) {
        insertValues(values)
      }
    })
    .catch(function(error) { console.error(error); });
  }


  /**
  * Insert a case
  * @param {object} data      - Json data with all case data
  * @param {integer} user_id  - Which user own the case
  */
  function insertCase(data, user_id) {

    knex.insert({
      user_id: user_id,
      name: data.name,
      description: data.description
    }, 'id')
    .into('cases')
    .then( (case_id) => {

      // To be track of numbers of aSync request and know when is done
      totalObjectives   = data.objectives.length;
      totalAlternatives = data.alternatives.length;

      // Add Objectives
      data.objectives.forEach((objective, index) => {
        let order = index + 1;
        insertObjective(objective, case_id, order, data.values)
      });

      // Add alternatives
      data.alternatives.forEach((alternative, index) => {
        let order = index + 1;
        insertAlternative(alternative, case_id, order, data.values)
      });

    })
    .catch(function(error) { console.error(error); });
  }

  // --------------------------------------------------------------------------
  // POST ROUTE

  router.post("/", (req, res) => {
    const data = JSON.parse(req.body.data);
    insertCase(data, user_id);
  });

  return router;
}