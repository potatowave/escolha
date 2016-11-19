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

  router.post("/", (req, res) => {
    const cases = JSON.parse(req.body.data);
    res.send(cases.name);

    knex.select('*')
    .from('users')
    .where({name: 'Tim'})
    .then(function(rows) {
    return knex.insert({user_id: rows[0].id, name: 'Test'}, 'id').into('accounts');
    })
    .then(function(id) {
    console.log('Inserted Account ' + id);
    })
    .catch(function(error) { console.error(error); });




    /*
    knex
      .select("*")
      .from("users")
      .where({
        id: 1,
      })
      .then((results) => {
        res.json(results);
    });
    */


  });

  return router;
}