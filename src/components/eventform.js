import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Eventexpense = () => {
  const [datas,setDatas] = useState([])
  const [date, setDate] = useState('');
  const [eventname, setEventname] = useState('');
  const [resource, setResource] = useState('');
  const [venue, setVenue] = useState('');
  const [expense, setExpense] = useState(0);


  const getTotal =async ()=>{
    if(!eventname)
    {
      alert("Event Field Is Mandatory")
    }
    else{
    try{
    const res = await axios.post('http://localhost:3001/gettotal',{eventname})
    setExpense(res.data)
    }catch{
      console.log("error")
    }
  }
  }

  const fetchName = async ()=>{
    const res = await axios.get('http://localhost:3001/collectionname')
    try{
      const data = res.data;
      setDatas(data); 
      console.log("data", data);
    }
    catch{
      console.log("error in fetch")
    }
  }

  useEffect(()=>{
    fetchName()
  },[])

  const handle = async(e) =>{
    e.preventDefault()
    if(!date || !resource || !venue || !expense)
    {
      alert("Enter Valid Inputs")
    }
    else{
      try{
        await axios.post('http://localhost:3001/eventwhole',{date,eventname,resource,venue,expense})
        alert("Data Is Added")
      }
      catch{
        alert("Error In Adding Data")
      }
    }
  }
  return (
    <div className="addform">
      <form onSubmit={handle}>
        <p>Add Event Expense</p>
        <div className="addinpt">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="addinpt">
          <label>Event:</label>
          <select value={eventname} onChange={(event)=>setEventname(event.target.value)}>
            <option>--Select--</option>
            {datas.map((dts,indx)=>(
              <option key={indx}>{dts}</option>
            ))}
          </select>
        </div>
        <div className="addinpt">
          <label>Resource Person:</label>
          <input
            type="text"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          />
        </div>
        <div className="addinpt">
          <label>Venue:</label>
          <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} />
        </div>
        <div id="totalinpt">
          <label>Expense:</label>
          <input type="text" value={parseFloat(expense).toFixed(2)}readOnly/>
          <button type='button' onClick={getTotal}>Get Total</button>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Eventexpense;