/* Get the case */
SELECT cases.id AS case_id,
       cases.name AS case_name
FROM cases
WHERE cases.id = 1



/*
-------------------------------------------------------------------------------
Many columns are being repetitive
*/

SELECT
  alternatives_objectives.*,

  alternatives.name AS alternative_name,
  objectives.name AS objective_name,
  objectives.sub_name AS objective_sub_name,

  alternatives.order AS alternative_order,
  objectives.order AS objective_order,

  objectives.evaluation_objective AS objective_evaluation_object,
  objectives.low_is_better AS objective_low_is_better,
  objectives.unit_name,
  objectives.unit_prefix,
  objectives.unit_suffix

FROM alternatives_objectives
JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id
JOIN objectives     ON alternatives_objectives.objective_id     = objectives.id

WHERE objectives.case_id = 1


/*
-------------------------------------------------------------------------------
Try to optmize using aggregation to array
*/

  SELECT
    array_agg(alternative_id) AS alternatives_ids,
    array_agg(alternative_order) AS alternatives_orders,
    array_agg(value) AS values,
    array_agg(alternative_name) AS alternative_names,
    objective_id
  FROM (
    SELECT
      alternatives_objectives.*,

      alternatives.name AS alternative_name,
      objectives.name AS objective_name,
      objectives.sub_name AS objective_sub_name,

      alternatives.order AS alternative_order,
      objectives.order AS objective_order,

      objectives.evaluation_objective AS objective_evaluation_object,
      objectives.low_is_better AS objective_low_is_better,
      objectives.unit_name,
      objectives.unit_prefix,
      objectives.unit_suffix

    FROM alternatives_objectives
    JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id
    JOIN objectives     ON alternatives_objectives.objective_id     = objectives.id

    WHERE objectives.case_id = 1
  ) as matrix

  GROUP BY matrix.objective_id




/*
-------------------------------------------------------------------------------
Getting unique rows of objectives
*/

SELECT DISTINCT ON (alternatives_objectives.objective_id)
    alternatives_objectives.objective_id,
      alternatives.name AS alternative_name,
      objectives.name AS objective_name,
      objectives.sub_name AS objective_sub_name,

      alternatives.order AS alternative_order,
      objectives.order AS objective_order,

      objectives.evaluation_objective AS objective_evaluation_object,
      objectives.low_is_better AS objective_low_is_better,
      objectives.unit_name,
      objectives.unit_prefix,
      objectives.unit_suffix

FROM alternatives_objectives
    JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id
    JOIN objectives     ON alternatives_objectives.objective_id    = objectives.id

WHERE objectives.case_id = 1




/*
-------------------------------------------------------------------------------
UGLY QUERY!!! RE_FACTOR!!!
-------------------------------------------------------------------------------
Getting all togheter - Making it easy to manipulation on server side
*/

SELECT * FROM (
  SELECT DISTINCT ON (alternatives_objectives.objective_id)
      alternatives_objectives.objective_id,

      objectives.name     AS objective_name,
      objectives.sub_name   AS objective_sub_name,
      objectives.order    AS objective_order,

      objectives.evaluation_objective AS objective_evaluation_object,
      objectives.low_is_better AS objective_low_is_better,
      objectives.unit_name,
      objectives.unit_prefix,
      objectives.unit_suffix

      FROM alternatives_objectives
        JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id
        JOIN objectives     ON alternatives_objectives.objective_id    = objectives.id

       WHERE objectives.case_id = 1
) tab1


 JOIN (

        SELECT
          array_agg(alternative_id) AS alternatives_ids,
          array_agg(alternative_order) AS alternatives_orders,
          array_agg(value) AS values,
          array_agg(alternative_name) AS alternative_names,
          objective_id
        FROM (
          SELECT
            alternatives_objectives.*,

            alternatives.name AS alternative_name,
            objectives.name AS objective_name,
            objectives.sub_name AS objective_sub_name,

            alternatives.order AS alternative_order,
            objectives.order AS objective_order,

            objectives.evaluation_objective AS objective_evaluation_object,
            objectives.low_is_better AS objective_low_is_better,
            objectives.unit_name,
            objectives.unit_prefix,
            objectives.unit_suffix

          FROM alternatives_objectives
          JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id
          JOIN objectives     ON alternatives_objectives.objective_id     = objectives.id

          WHERE objectives.case_id = 1
        ) as matrix

        GROUP BY matrix.objective_id

    ) as tab2

 ON tab1.objective_id = tab2.objective_id


/*
Returning Example of the last query:
[
  {
    "objective_evaluation_object" : "Salary + benefits",
    "objective_name" : "Cost",
    "objective_id" : 1,
    "objective_order" : 1,
    "objective_low_is_better" : false,
    "unit_prefix" : "$",
    "alternative_names" : "{Facebook,Google,LightHouse}",
    "values" : "{120000,150000,95000}",
    "alternatives_ids" : "{1,2,3}",
    "objective_sub_name" : "Salary",
    "alternatives_orders" : "{1,2,3}",
    "unit_name" : "Money",
    "unit_suffix" : null
  },
  {
    "objective_evaluation_object" : "Distance from home",
    "objective_name" : "Location",
    "objective_id" : 2,
    "objective_order" : 2,
    "objective_low_is_better" : true,
    "unit_prefix" : null,
    "alternative_names" : "{Facebook,Google,LightHouse}",
    "values" : "{10,25,5}",
    "alternatives_ids" : "{1,2,3}",
    "objective_sub_name" : "Distance",
    "alternatives_orders" : "{1,2,3}",
    "unit_name" : "Meters",
    "unit_suffix" : "m"
  }
]

[
  {alternative_id: 1, objective_id: 2},
  {alternative_id: 1, objective_id: 2},
  {alternative_id: 1, objective_id: 2},
  {alternative_id: 1, objective_id: 2},
]
*/


/*
Best Way for redux: leave like a relational database
Just query separated


Users: SELECT * FROM users WHERE id = 1
Cases: SELECT * FROM cases WHERE user_id = 1

Objectives:
SELECT objectives.* FROM objectives
JOIN cases ON cases.id = objectives.case_id
JOIN users ON users.id = cases.user_id
WHERE users.id = 1

Alternatives:
SELECT alternatives.* FROM alternatives
JOIN cases ON cases.id = alternatives.case_id
JOIN users ON users.id = cases.user_id
WHERE users.id = 1

Alternatives_objectives:


Monica Example:
{
  users: [ {} ],
  cases: [
    {} // all cases for user
  ],
  alternatives: [
    {} // alternatives for all cases of user
  ]
}

*/