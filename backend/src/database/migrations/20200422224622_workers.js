
exports.up = function(knex) {
  return knex.schema.createTable('workers', function(table){
    table.increments()

    table.string('name').notNullable()
    table.string('code').notNullable()
    table.decimal('occupation').notNullable()

    table.string('company_id').notNullable()
    table.foreign('company_id').references('id').inTable('company')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('workers')
};
