exports.up = function(knex) {
  return knex.schema.createTable('short-quiz_stimulusResponses', table => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('short-quiz_users');
    table.string('stimulus').references('stimulus').inTable('short-quiz_stimuli');
    table.json('data_string');
    table.timestamp('created_at');
    table.timestamp('updated_at');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('short-quiz_stimulusResponses');
};
