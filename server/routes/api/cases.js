"use strict";

const express = require('express');
const router  = express.Router();
const Case    = require('../../models/Case');

module.exports = (knex) => {

  /**
  * ROUTE: /api/cases
  * Add a full case
  */
  router.post("/", (req, res) => {
    const data = JSON.parse(req.body.data);

    // Call the Model to interact with data
    Case(knex).insertCase(data, (msg) => {
      res.send(msg);
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

  return router;
}

/*
JSON Expected into POST Request
data = {
  "name": "Car",
  "description": "I want to choose some car",

  "objectives": [{
      "id_frontend": 99,
      "objective": "Cost",
      "subObjective": "Price",
      "criterion": "Just the car price",
      "low_is_better": true,
      "unit_name": "money",
      "unit_prefix": "$",
      "unit_suffix": "",
      "scale_type": "this is managed on the front-end"
    },

    {
      "id_frontend": 88,
      "objective": "Cost",
      "subObjective": "Mainetence",
      "criterion": "Per year mainetence",
      "low_is_better": true,
      "unit_name": "money",
      "unit_prefix": "$",
      "unit_suffix": "",
      "scale_type": "this is managed on the front-end"
    }
  ],

  "alternatives": [{
      "id_frontend": 11,
      "name": "Ferrari",
      "image_url": "https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg"
    },

    {
      "id_frontend": 22,
      "name": "Lamborghini",
      "image_url": "https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg"
    },

    {
      "id_frontend": 33,
      "name": "Lamborghini",
      "image_url": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X"
    }
  ],

  "values": [{
      "objective_id": 99,
      "alternative_id": 11,
      "value": 150000
    }, {
      "objective_id": 99,
      "alternative_id": 22,
      "value": 390888
    }, {
      "objective_id": 99,
      "alternative_id": 33,
      "value": 420123
    },

    {
      "objective_id": 88,
      "alternative_id": 11,
      "value": 120
    }, {
      "objective_id": 88,
      "alternative_id": 22,
      "value": 99
    }, {
      "objective_id": 88,
      "alternative_id": 33,
      "value": 560
    }
  ]
}



*/
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