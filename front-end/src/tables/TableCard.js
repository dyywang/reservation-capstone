import React from "react";
import {finishTable, updateReservationStatus}  from "../utils/api"

function TableCard({table, setUpdated, updated}){
  
  async function finish(){
    await finishTable(table.table_id)
    await updateReservationStatus(table.reservation_id, "finished")
    setUpdated(!updated)
  }

  return  <div className="card mb-1">
            <div className="row m-1 p-1" data-table-id-status={table.table_id} key={table.table_id}>
              <div>{table.table_name} - {table.capacity} </div> <span data-table-id-status={table.table_id} className="badge badge-secondary ml-2 mb-1 mt-1">{table.reservation_id ? "Occupied" : "Free" }</span>
            </div>
            {table.reservation_id && 
              <div className="row">
                <button onClick={()=>window.confirm("Is this table ready to seat new guests? This cannot be undone.") 
                  ? finish() : null} 
                  className="btn btn-primary btn-sm ml-4 mb-1" 
                  data-table-id-finish={table.table_id}>Finish</button>  
            </div>}
          </div>
}

export default TableCard