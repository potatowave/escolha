exports.seed = function(knex, Promise) {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({name: 'Bob', email: 'mail@mail.com', password: '123'}),
    ]);
};
