import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import {createTable} from "../utils/api"

function NewTable(){
  const emptyFormData = {table_name:"", capacity:0}
  const [formData, setFormData] = useState(emptyFormData)
  const [errors, setErrors] = useState([])
  const handleChange = (event) => setFormData({...formData, [event.target.name]:event.target.value})
  const history = useHistory()
  function validateData(form){
    setErrors([])
    let newErrors = []
    if (!form.table_name || form.table_name.length < 2)
      newErrors.push("A table name of at least 2 characters is required")
    if (!form.capacity || form.capacity < 1)
      newErrors.push("Table must have a capacity of 1 or more")
    setErrors(newErrors)
    return newErrors
  }
  async function handleSubmit(event) {
    event.preventDefault()
    const newErrors = validateData(formData)
    if (!newErrors.length){
      await createTable(formData)
      history.push("/dashboard")
    }
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
        <label className="row" htmlFor="table_name">Table Name</label>
        <input className="row w-50" name="table_name" id="table_name" type="text" 
            onChange={handleChange}></input>
        <label className="row" htmlFor="capacity">Capacity</label>
        <input className="row w-50" name="capacity" id="capacity" type="text" 
            onChange={handleChange}></input>
            <div className="row mt-4">
        <button className="btn btn-secondary mr-2" onClick={()=>history.goBack()}>Cancel</button>
        <button className="btn btn-primary" type="submit">Submit</button>
      </div>
      </form>
    </div>
  )
}

export default NewTable