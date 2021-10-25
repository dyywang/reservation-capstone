import React from "react";
import ReservationDetail from "./ReservationDetail"

function ReservationList({reservations, setUpdated, updated}){
  return (
  <div>{
    reservations && reservations.map( (reservation, index)=>{
      return <ReservationDetail reservation={reservation} setUpdated = {setUpdated} updated={updated} key={index}/>
    })} 
  </div> )
}

export default ReservationList