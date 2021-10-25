import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom"
import { listReservations , listTables} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery"
import { previous, next } from "../utils/date-time";
import ReservationList from "../reservations/ReservationList";
import TableCard from "../tables/TableCard";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setUpdated, updated }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  
  const history = useHistory()
  const query = useQuery()
  const queryDate = query.get("date")
  if (queryDate)
    date = queryDate
  
  useEffect(loadDashboard, [date, updated]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null)
    listReservations({ date }, abortController.signal)
      .then( (reservations)=>{return reservations.filter((reservation)=>{return reservation.status !== "finished"})})
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="row ml-1">Reservations for date:</h4>
      </div>
      <div className="row ml-1">
          <button className="btn btn-primary" onClick={()=>{history.push(`/dashboard?date=${previous(date)}`)}}>
            Previous
          </button>
          <button className="btn btn-secondary">
            {date}
          </button>
          <button className="btn btn-primary" onClick={()=>{history.push(`/dashboard?date=${next(date)}`)}}>
            Next
          </button>
        </div>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      {reservations &&
        <ReservationList reservations={reservations} setUpdated={setUpdated} udpated={updated} />
      }
      <div className="card p-1 mt-2 pt-2">
      <h6>Tables: </h6>
      {tables && tables.sort((a, b)=>a.table_name > b.table_name).map( (table, index)=>{
        return <TableCard table={table} key={index} setUpdated={setUpdated} updated={updated}/>
      })}
      </div>
    </main>
  );
}

export default Dashboard;
