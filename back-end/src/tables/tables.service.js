const knex = require("../db/connection")
const reservationsService = require("../reservations/reservations.service")

function list(){
  return knex("tables")
          .select("*")
}

function create(table){
  return knex("tables")
          .insert(table)
          .returning("*")
          .then((createdRecords) => createdRecords[0]);
}

function read(table_id){
  return knex("tables")
          .select("*")
          .where({table_id: table_id})
          .first()
}

function assignSeat(table_id, reservation_id){
  return knex.transaction((trx)=>{
        knex("tables")
          .update("reservation_id", reservation_id)
          .where({table_id:table_id})
          .select("*")
          .transacting(trx)
          .then(()=>reservationsService.updateStatus(reservation_id, "seated"))
          .then(trx.commit)
          .then( ()=>read(reservation_id))
          .catch(trx.rollback)
    })
  }
function finishSeat(table_id){
  return knex("tables")
          .update("reservation_id", null )
          .where({table_id:table_id})
          .select("*")
          .then( ()=>read(table_id))
}

module.exports = {
  list, 
  create,
  read,
  assignSeat,
  finishSeat
}