/*exports.up = function(knex) {
  return knex.schema.createTable('short-quiz_stimuli', table => {
    table.string('stimulus').primary();
    table.specificType('choices', 'jsonb[]');
    table.string('correct');
    table.integer('num_responses');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('short-quiz_stimuli');
};
*/

exports.up = function(knex) {
  return knex.schema.createTable('short-quiz_stimuli', table => {
    table.string('stimulus').primary();
    table.string('choices');
    table.string('correct');
    table.integer('num_responses');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('short-quiz_stimuli');
};