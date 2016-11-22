exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('alternatives_objectives').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('objectives').del(),
        knex('alternatives').del(),
        knex('cases').del(),
        knex('users').del()
      ]);
    });
};