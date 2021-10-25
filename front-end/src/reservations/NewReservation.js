import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import {createReservation, readReservation, editReservation} from "../utils/api"
import { today } from "../utils/date-time"
import formatReservationDate from "../utils/format-reservation-date"
import formatReservationTime from "../utils/format-reservation-time"
import moment from "moment"

function NewReservation({edit=false}){
  const {reservation_id} = useParams()
  const initialFormData = {first_name:"", last_name:"", mobile_number:"", reservation_date:today(), reservation_time:"", people:1, status:"booked"}
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState([])
  const handleChange = (event) => setFormData({...formData, [event.target.name]:event.target.value})
  const history = useHistory()
  const handleSubmit = async(event)=>{
    event.preventDefault()
    const j = await validateData(formData)
    console.log(j)
    setErrors(j)
    console.log("Errors:",errors)
    if (!j.length){
      console.log(j)
      if (edit)
        await editReservation(formData)
      else 
        await createReservation(formData)
      const date = formData.reservation_date
      history.push(`/dashboard?date=${date}`)
    } 
  }

  useEffect(()=>{
    const abortController = new AbortController();
    if (edit)
      readReservation(reservation_id).then(setFormData).catch(setErrors)
    return () => abortController.abort();
  }, [reservation_id, edit])

  async function validateData(formData){
    //setErrors([])
    let newErrors = []

    const reservationDate = formatReservationDate(formData).reservation_date
    const reservationTime = formatReservationTime(formData).reservation_time
    if (reservationDate < today())
      newErrors.push("Date must be in the future")
    if (moment(reservationDate, "YYYY-MM-DD").day() === 2)
      newErrors.push("Restaurant is not open on Tuesdays")
    if (reservationTime < "10:30")
      newErrors.push("Reservation Time must be after 10:30AM")
    if (reservationTime > "21:30")
      newErrors.push("Reservation Time must be before 9:30PM")
    console.log(formData.people)
    if (!Number(formData.people) >= 1)
      newErrors.push("Reservation must have at least one person")
    console.log("New Errors: ", newErrors)
    return newErrors
  }

  return (
  <div>
    <div>
      {errors.length > 0 && 
        <div className="alert alert-danger"> 
          {errors.map((error, index)=>{return <div key={index}>{error}</div>})}
        </div>
      }
    </div>
    <form className="m-2 p-2" onSubmit={handleSubmit}>
      <div><label className="row" htmlFor="first_name">First Name</label>
      <input className="row w-50" name="first_name" id="first_name" type="text" 
          onChange={handleChange} value={formData.first_name}></input>
      </div>
      <label className="row" htmlFor="last_name">Last Name</label>
      <input className="row w-50" name="last_name" id="last_name" type="text" 
          onChange={handleChange} value={formData.last_name}></input>
      <label className="row" htmlFor="mobile_number">Mobile Number</label>
      <input className="row w-50" name="mobile_number" id="mobile_number" type="text" 
          onChange={handleChange} value={formData.mobile_number}></input>
      <label className="row" htmlFor="reservation_date">Reservation Date</label>
      <input className="row w-50" name="reservation_date" id="reservation_date" type="date" 
          onChange={handleChange} value={formData.reservation_date}></input>
      <label className="row" htmlFor="reservation_time">Reservation Time</label>
      <input className="row w-50" name="reservation_time" id="reservation_time" type="time" 
          onChange={handleChange} value={formData.reservation_time}></input>
      <label className="row" htmlFor="people">People</label>
      <input className="row w-50" name="people" id="people" type="text" 
          onChange={handleChange} value={formData.people}></input>
      <div className="row mt-4">
        <button type="button" name="cancel" className="btn btn-secondary mr-2" onClick={()=>history.goBack()}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
  )
}
export default NewReservation