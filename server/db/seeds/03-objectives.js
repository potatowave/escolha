exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('objectives').insert({id: 1, case_id:1, name: 'Cost', sub_name: 'Salary', evaluation_objective: 'Salary + benefits', low_is_better: false, order: 1,unit_name: 'Money', unit_prefix: '$', unit_suffix: null, is_hidden: false }),

    knex('objectives').insert({id: 2, case_id:1, name: 'Location', sub_name: 'Distance', evaluation_objective: 'Distance from home', low_is_better: true, order: 2,unit_name: 'Meters', unit_prefix: null, unit_suffix: 'm', is_hidden: false }),

    knex('objectives').insert({id: 3, case_id:2, name: 'Cost', sub_name: 'Price', evaluation_objective: 'Some Stuff', low_is_better: true, order: 1, unit_name: 'Money', unit_prefix: '$', unit_suffix: null, is_hidden: false}),

    knex('objectives').insert({id: 4, case_id:2, name: 'Cost', sub_name: 'Mileage', evaluation_objective: 'Used car', low_is_better: false, order: 2, unit_name: 'Meters', unit_prefix: null, unit_suffix: 'm', is_hidden: false })
  ]);
};