exports.seed = function(knex, Promise) {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({name: 'Bob', email: 'mail@mail.com', password: '$2a$10$1pPxhaypb4A6J4xz7ECCKu.Zh7RVrHLfb7BnoP0/UtDeMaySL7XgG'}),
    ]);
};
