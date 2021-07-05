exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: 987637829837,
          make: "Dodge",
          model: "Grand Carvan",
          mileage: 60000
        },
        {
          VIN: 098584843085,
          make: "Dodge",
          model: "Cherokee",
          mileage: 78300
        },
        {
          VIN: 584938498588,
          make: "Dodge",
          model: "Ram",
          mileage: 108483
        }
      ]);
    });
};
