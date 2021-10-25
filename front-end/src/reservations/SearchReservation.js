import React, {useState} from "react";
import { searchReservationByPhone } from "../utils/api";
import ReservationList from "./ReservationList";

function SearchReservation(){
  const [searched, setSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [reservations, setReservations] = useState([])
  const onChange = (event) => setSearchTerm(event.target.value)
  const handleSubmit = (event) =>{
    event.preventDefault()
    searchReservationByPhone(searchTerm)
      .then(setReservations)
      .then(()=>setSearched(true))
      //.then(()=>console.log(reservations))
  }
  return <div>
    <form onSubmit={handleSubmit}>
    <label htmlFor="mobile_number">Mobile Number:</label>
    <input type-="text" name="mobile_number" id="mobile_number" value={searchTerm} onChange={onChange}></input>
    <button type="submit">Find</button>
    </form>
    <div>
      {searched && reservations.length === 0 && "No reservations found"}
      {reservations &&
        <ReservationList reservations={reservations} />
      }
      </div>
  </div>
}

export default SearchReservation