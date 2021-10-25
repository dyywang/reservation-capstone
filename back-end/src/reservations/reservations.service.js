const knex = require("../db/connection")


function list(date=null){
  if (!date)
    return knex("reservations")
            .select("*")
  else
    return knex("reservations")
            .select("*")
            .where("reservation_date", date)
}

function read(reservation_id){
  return knex("reservations")
          .select("*")
          .where({reservation_id: reservation_id})
          .first()
}

function create(data){
  return knex("reservations")
          .insert(data)
          .returning("*")
          .then((createdRecords) => createdRecords[0]);
}

function updateStatus(reservation_id, status){
  return knex("reservations")
            .update("status", status)
            .where({reservation_id:reservation_id})
            .select("*")
            .then( ()=>read(reservation_id))
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function updateReservation(reservation){
  return knex("reservations")
            .update(reservation)
            .where({reservation_id:reservation.reservation_id})
            .returning("*")
            .then( (updatedRecords)=>updatedRecords[0])
  }

module.exports = {
  list,
  create,
  read, 
  updateStatus,
  search,
  updateReservation
}