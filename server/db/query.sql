# Get the case
SELECT cases.id AS case_id,
       cases.name AS case_name
FROM cases
WHERE cases.id = 1




SELECT
  alternatives_objectives.*,

  alternatives.name AS alternative_name,
  objectives.name AS objective_name,

  alternatives.order AS alternative_order,
  objectives.order AS objective_order,

  objectives.evaluation_object AS objective_evaluation_object,
  objectives.low_is_better AS objective_low_is_better,
  objectives.unit_name,
  objectives.unit_prefix,
  objectives.unit_suffix

FROM alternatives_objectives
JOIN alternatives   ON alternatives_objectives.alternative_id  = alternatives.id
JOIN objectives     ON alternatives_objectives.objective_id     = objectives.id

WHERE objectives.case_id = 1