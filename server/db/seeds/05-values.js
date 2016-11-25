exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('alternatives_objectives').insert({alternative_id: 1, objective_id: 1, value: 11}),
    knex('alternatives_objectives').insert({alternative_id: 2, objective_id: 1, value: 21}),
    knex('alternatives_objectives').insert({alternative_id: 3, objective_id: 1, value: 31}),

    knex('alternatives_objectives').insert({alternative_id: 1, objective_id: 2, value: 12}),
    knex('alternatives_objectives').insert({alternative_id: 2, objective_id: 2, value: 22}),
    knex('alternatives_objectives').insert({alternative_id: 3, objective_id: 2, value: 32}),

    knex('alternatives_objectives').insert({alternative_id: 4, objective_id: 3, value: 43}),
    knex('alternatives_objectives').insert({alternative_id: 5, objective_id: 3, value: 53}),
    knex('alternatives_objectives').insert({alternative_id: 6, objective_id: 3, value: 63}),

    knex('alternatives_objectives').insert({alternative_id: 4, objective_id: 4, value: 44}),
    knex('alternatives_objectives').insert({alternative_id: 5, objective_id: 4, value: 54}),
    knex('alternatives_objectives').insert({alternative_id: 6, objective_id: 4, value: 64}),
  ]);
};