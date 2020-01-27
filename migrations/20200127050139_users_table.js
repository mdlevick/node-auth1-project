exports.up = function(knex) {
    return knex.schema
      .createTable("users", tbl => {
        tbl.increments();
        tbl.string("userName", 255).notNullable();
        tbl.string("password", 255).notNullable();
    })
};
  
// like putting on / taking off socks and shoes!!!
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users");
};