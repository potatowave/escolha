
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cases').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cases').insert({id: 1, user_id: 1, name: 'Jobs', description: 'Helping choose my job'}),
        knex('cases').insert({id: 2, user_id: 1, name: 'Cars', description: 'Comparing cars'}),
      ]);
    });
};
