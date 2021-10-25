import React from "react";
import {useHistory} from "react-router-dom"
import {updateReservationStatus} from "../utils/api"

function ReservationDetail({reservation, setUpdated, updated}){
  const history = useHistory()
  const handleCancel = async () => {
    await updateReservationStatus(reservation.reservation_id,  'cancelled') 
    setUpdated(!updated)
  }
  return ( 
    <div className="card mr-4 mt-2 p-2" key={reservation.reservation_id}> 
      <div className="row">
        <div className="col">
          <div><b>Reservation ID:</b> {reservation.reservation_id}</div>
        </div>
        <div className="col">
        <div><b> Time: </b>{reservation.reservation_time}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div><b>First Name:</b> {reservation.first_name}</div>
        </div>
        <div className="col">
        <div><b>Phone #: </b> {reservation.mobile_number}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div><b>Last Name:</b> {reservation.last_name} </div>
        </div>
        <div className="col">
          <div><b>People:</b> {reservation.people} </div>
        </div>
      </div>
        <div className = "row"  >
          <div className="col" >
          <div className="badge badge-secondary" data-reservation-id-status={reservation.reservation_id}>{reservation.status} </div>
          </div>
        </div>  
     
      <div className="row ml-1 mt-1">
        { reservation.status === "booked" &&
        <div>
          <button type="button" className="pt-1 btn-sm btn-primary"
              href={`reservations/${reservation.reservation_id}/seat`}
              onClick={()=>{history.push(`reservations/${reservation.reservation_id}/seat`)}}>
          Seat</button>
          <button type="button" className="pt-1 ml-1 btn-sm btn-primary"
              href={`reservations/${reservation.reservation_id}/edit`}
              onClick={()=>{history.push(`reservations/${reservation.reservation_id}/edit`)}}>
          Edit</button>
          <button type="button" className='pt-1 ml-1 btn-sm btn-secondary' data-reservation-id-cancel={reservation.reservation_id}
            onClick={ ()=> window.confirm("Do you want to cancel this reservation? This cannot be undone.") ? handleCancel() : null 
            }>
          Cancel </button>
        </div>
        }
      </div>
  </div>
  )
}

export default ReservationDetail