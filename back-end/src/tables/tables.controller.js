
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const tablesService = require("./tables.service")

async function list(req, res, next){
  const tables = await tablesService.list()
  res.json({data:tables})
}

const VALID_FIELDS = ["table_name", "capacity", "reservation_id"]

async function create(req, res, next){
  const data = await tablesService.create(req.body.data)
  res.status(201).json({data})
}

function hasOnlyValidProperties(req, res, next){
  const {data={}} = req.body
  const invalidFields = Object.keys(data).filter( (key) => !VALID_FIELDS.includes(key))
  if (invalidFields.length)
    return next({status:400, message:`Invalid fields: ${invalidFields.join(", ")}`})
  next()
}

async function tableExists(req, res, next){
  const table_id = req.params.table_id
  const table = await tablesService.read(table_id)
  if (!table)
    return next({status:400, message:`Table ${table_id} does not exist`})
  else{
    res.locals.table_id = table_id
    res.locals.table = table
  }
  next()
}

async function assignSeat(req, res, next){
  const reservation_id = Number(req.body.data.reservation_id)
  const response = await tablesService.assignSeat(res.locals.table_id, reservation_id)
  res.json({data:response})
}

async function finishSeat(req, res, next){
  if (!res.locals.table.reservation_id)
    next({status:400, message:"Table is not occupied"})
  const response = await tablesService.finishSeat(res.locals.table_id)
  res.json({data:response})
}

module.exports = {
  list,
  create:[hasOnlyValidProperties, asyncErrorBoundary(create)],
  assignSeat:[asyncErrorBoundary(tableExists), asyncErrorBoundary(assignSeat)],
  finishSeat:[asyncErrorBoundary(tableExists), asyncErrorBoundary(finishSeat)]
}