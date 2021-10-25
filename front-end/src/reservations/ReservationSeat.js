import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, readReservation, assignSeat} from "../utils/api";

function ReservationSeat({setUpdated, updated}){
  const {reservation_id} = useParams()
  const [reservation, setReservation] = useState(null)
  const [tables, setTables] = useState([])
  const [selected, setSelected] = useState("")
  const [errors, setErrors] = useState([])
  const history = useHistory()
  useEffect(()=>{
    const abortController = new AbortController();
    readReservation(reservation_id).then(setReservation).catch(setErrors)
    listTables(abortController.signal).then(setTables).catch(setErrors)
    return () => abortController.abort();
  }, [reservation_id])

  async function handleSubmit(event){
    event.preventDefault()
    const capacity = tables.find( (table)=>{return parseInt(table.table_id) === parseInt(selected)}).capacity
    if (selected && capacity >= reservation.people ) {
      await assignSeat(selected, reservation_id)
      //await updateReservationStatus(reservation_id, "seated")
      setUpdated(!updated)
      history.push("/dashboard")
    } else {
      setErrors("Cannot seat at a smaller table than reservation.")
    }
  }

  return (
    <div>
      <div>
        {errors.length > 0 && 
          <div className="alert alert-danger"> {errors} </div>
        }
      </div>
      <h6>Assign a Seat:</h6>
      {tables.length && reservation && 
      <form onSubmit={handleSubmit}>
        <select name="table_id" onChange={(event)=>setSelected(event.target.value)} value={selected}>
          {<option key="blank" value="" >-- Select an Option --</option>}
        {tables.map( (table, index) =>{
          return <option key={index} value={table.table_id}>{table.table_name} - {table.capacity}</option>
        })}
      </select>
        <div className="row"><button className="btn-sm btn-primary ml-2" type="submit">Submit</button>
        <div className="btn-sm btn-secondary ml-1" onClick={()=>history.goBack()}>Cancel</div>
      </div>
      </form>
      } 
    </div>
  )
}
//disabled={reservation.people > table.capacity} 

export default ReservationSeat