
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {username: "Alice", password: "pass123", telephone: "999-999-9999"},
        {username: "Stephanie", password: "pass123", telephone: "555-555-5555"},
        {username: "Devon", password: "pass123", telephone: "222-222-2222"}
      ]);
    });
};
