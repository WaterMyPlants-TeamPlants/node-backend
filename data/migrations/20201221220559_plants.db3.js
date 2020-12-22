
exports.up = function (knex) {
  return knex.schema
    .createTable("users", col => {
      col.increments();
      col.text("username", 128).notNullable().unique();
      col.text("password", 18).notNullable();
      col.text("telephone", 128).notNullable();
    })
    .createTable("plants", col => {
      col.increments();
      col.text("nickname", 128).notNullable().defaultTo("unknown");
      col.text("species", 128).notNullable().defaultTo("unknown");
      col.integer("frequency").notNullable().defaultTo(24).unsigned();
      col.text("img_url");
      col.integer("user_id").notNullable().unsigned()
        .references("id").inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('table'); 
};
