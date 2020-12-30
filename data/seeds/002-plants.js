
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {nickname: "Jimmy", species: 'daffodil', frequency: 48, img_url: "http://plantpic.com", user_id: 1},
        {nickname: "Frank", species: 'jalapeno', frequency: 24, img_url: null, user_id: 2},
        {nickname: "Julius", species: 'cactus', frequency: 128, img_url: "http://plantpic.com", user_id: 3}
      ]);
    });
};
