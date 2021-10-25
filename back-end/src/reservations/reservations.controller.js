const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const reservationsService = require("./reservations.service")
/**
 * List handler for reservation resources
 */
const VALID_PROPERTIES = [
  'reservation_id',
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
  'status'
]


function hasOnlyValidProperties(req, res, next){
  const {data = {}} = req.body
  const invalidFields = Object.keys(data).filter( (key) => !VALID_PROPERTIES.includes(key))
  if (invalidFields.length)
    return next({status:400, message:`Invalid Fields: ${invalidFields.join(", ")}`})
  next()
}

async function list(req, res) {
  const date = req.query.date
  const mobile_number = req.query.mobile_number
  let reservations
  if (date)
    reservations = await reservationsService.list(date)
  else if (mobile_number)
    reservations = await reservationsService.search(mobile_number)
  res.json({data: reservations,});
}

async function validReservation(req, res, next){
  const reservation_id = req.params.reservation_id
  const reservation = await reservationsService.read(reservation_id)
  if (reservation){
    res.locals.reservation = reservation
    return next()
  }
    else next({status:400, message: "Reservation does not exist."})
}

function read(req, res, next){
  const reservation = res.locals.reservation
  res.json({data: reservation})
}

async function create(req, res, next){
  const data = await reservationsService.create(req.body.data)
  res.status(201).json({data})
}

async function update(req, res, next){
  const status = req.body.data.status
  const reservation_id = res.locals.reservation.reservation_id
  const data = await reservationsService.updateStatus(reservation_id, status)
  res.status(200).json({data})
}

async function updateReservation(req, res, next){
  const data = await reservationsService.updateReservation(req.body.data)
  res.status(200).json({data})
}

function validate(req, res, next){
  const {data = {}} = req.body
  if (!data.first_name)
    next({status:400, message: "First name is required."})
  if (!data.last_name)
    next({status:400, message: "Last name is required."})
  if (!data.mobile_number)
    next({status:400, message: "Mobile number is required."})
  if (!data.reservation_date)
    next({status:400, message: "Reservation date is required."})
  if (!data.reservation_time)
    next({status:400, message: "Reservation time is required."})
  if (!data.people)
    next({status:400, message: "Number of people is required."})
  if (data.people && data.people < 1)
    next({status:400, message: "Reservation requires at least one person"})
  if (data.reservation_time < "10:30")
    next({status:400, message: "Reservation time must be after 10:30AM"})
  if (data.reservation_time > "21:30")
    next({status:400, message: "Reservation time must be before 9:30PM"})
  return next()
}

module.exports = {
  list:[asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties, validate, asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(validReservation), read],
  update: [asyncErrorBoundary(validReservation), asyncErrorBoundary(update)],
  updateReservation: [asyncErrorBoundary(validReservation), asyncErrorBoundary(updateReservation)]
};
