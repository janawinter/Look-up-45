exports.up = function (knex, Promise) {
  return knex.schema.createTable('collection', function (table) {
    table.increments('id').primary()
    table.string('artist')
    table.string('catno')
    table.integer('price')
    table.integer('releaseId')
    table.integer('quantity')

  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('collection')
}
