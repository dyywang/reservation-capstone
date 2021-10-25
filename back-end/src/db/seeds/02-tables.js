exports.seed = function(knex){
  return knex("tables")
    .insert([
      {
        //"type":"bar",
        "table_name":"Bar #1",
        "capacity":1
      },
      {
        //"type":"bar",
        "table_name":"Bar #2",
        "capacity":1
      },
      {
        //"type":"table",
        "table_name":"#1",
        "capacity":6
      },
      {
        //"type":"table",
        "table_name":"#2",
        "capacity":6
      }
    ])
}