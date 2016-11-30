
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('email').unique(); // set a index! help db find faster
      table.string('password');
      table.timestamps();
    }),

    knex.schema.createTable('cases', function (table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.string('name');
      table.text('description');
      table.timestamps();
    }),

    knex.schema.createTable('objectives', function (table) {
      table.increments('id').primary();
      table.integer('case_id').unsigned();
      table.foreign('case_id').references('cases.id');
      table.string('name');
      table.string('sub_name');
      table.text('evaluation_objective');
      table.boolean('low_is_better');
      table.integer('order').unsigned();
      table.string('unit_name');
      table.string('unit_prefix');
      table.string('unit_suffix');
      table.boolean('is_hidden');
      table.integer('ordinal_minimum').unsigned();
      table.integer('ordinal_maximum').unsigned();
      table.timestamps();
    }),

    knex.schema.createTable('alternatives', function (table) {
      table.increments('id').primary();
      table.integer('case_id').unsigned();
      table.foreign('case_id').references('cases.id');
      table.string('name');
      table.string('image_url');
      table.integer('order').unsigned();
      table.boolean('is_hidden');
      table.timestamps();
    }),

    knex.schema.createTable('alternatives_objectives', function (table) {
      table.increments('id').primary();
      table.integer('alternative_id').unsigned()
      table.foreign('alternative_id').references('alternatives.id');
      table.integer('objective_id').unsigned()
      table.foreign('objective_id').references('objectives.id');
      table.float('value');
      table.string('nominal_name');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('alternatives_objectives'),
    knex.schema.dropTable('alternatives'),
    knex.schema.dropTable('objectives'),
    knex.schema.dropTable('cases'),
    knex.schema.dropTable('users')
  ])
};
