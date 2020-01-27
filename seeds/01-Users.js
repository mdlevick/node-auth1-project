
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
           userName: 'Aethergrove',
          password: 'sacredforest'
        },
          {
             userName: 'BobTBuilder',
          password: 'canwefixit'
        },
          {
             userName: 'MasterCheif',
          password: 'whooraaa'
        },
      ]);
    });
};
