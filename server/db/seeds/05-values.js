exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('alternatives_objectives').insert({alternative_id: 1, objective_id: 1, value: 120000}),
    knex('alternatives_objectives').insert({alternative_id: 2, objective_id: 1, value: 150000}),
    knex('alternatives_objectives').insert({alternative_id: 3, objective_id: 1, value: 95000}),

    knex('alternatives_objectives').insert({alternative_id: 1, objective_id: 2, value: 10}),
    knex('alternatives_objectives').insert({alternative_id: 2, objective_id: 2, value: 25}),
    knex('alternatives_objectives').insert({alternative_id: 3, objective_id: 2, value: 5}),

    knex('alternatives_objectives').insert({alternative_id: 4, objective_id: 3, value: 550000}),
    knex('alternatives_objectives').insert({alternative_id: 5, objective_id: 3, value: 420000}),
    knex('alternatives_objectives').insert({alternative_id: 6, objective_id: 3, value: 650000}),

    knex('alternatives_objectives').insert({alternative_id: 4, objective_id: 4, value: 55}),
    knex('alternatives_objectives').insert({alternative_id: 5, objective_id: 4, value: 36}),
    knex('alternatives_objectives').insert({alternative_id: 6, objective_id: 4, value: 20}),
  ]);
};