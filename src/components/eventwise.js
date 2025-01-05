import axios from 'axios'
import React, { useState } from 'react'
import {members,particulars} from './members/data'
import '../App.css'
const Eventwise = () => {
    const [sl,setSl] = useState('')
    const [date,setDate] = useState('')
    const [event,setEvent] = useState('')
    const [bill,setBill] = useState('')
    const [particular,setParticular] = useState('')
    const [givento,setGivento] = useState('')
    const [expense,setExpense] = useState('')

    const handlesubmit = async(e)=>
    {
        e.preventDefault()
        if(!date || !givento || !expense || expense < 0 || !particular || !bill || !event)
            {
              alert('enter valid inputs')
            }
        else
        {
        try{
            const res = await axios.post('http://localhost:3001/eventwise',{sl,date,event:event.toLowerCase(),bill,particular,givento,expense})
            const bilrs = await axios.post('http://localhost:3001/billdetails',{sl,date,bill,particular,expense})
            if (res.status === 200){
            alert("Data Added Successfully")
            setBill('')
            setParticular('')
            setGivento('')
            setExpense('')
            }
        }
        catch(error)
        {
            alert(error)
        }
    }
    }
  return (
    <div className="addform">
    <form action="" onSubmit={handlesubmit}>
    <div className="addinpt">
            <label>Sl No:</label>
            <input type="number" value={sl} onChange={(e)=>setSl(e.target.value)}/>
        </div>
        <div className="addinpt">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className="addinpt">
            <label>Event:</label>
            <input type="text" value={event} onChange={(e)=>setEvent(e.target.value)}/>
        </div>
        <div className="addinpt">
            <label>Bill No:</label>
            <input type="text" value={bill} onChange={(e)=>setBill(e.target.value)}/>
        </div>
        <div className="addinpt">
            <label>Particular:</label>
            <select value={particular} onChange={(event)=>setParticular(event.target.value)}>
                <option>--Select--</option>
                {particulars.map((dts,indx)=>(
                    <option key={indx}>{dts}</option>
                ))}
            </select>
        </div>
        <div className="addinpt">
            <label>Given To:</label>
            <select value={givento} onChange={(event)=>setGivento(event.target.value)}>
                <option>--Select--</option>
                {members.map((member,indx)=>(
                    <option key={indx}>{member}</option>
                ))}
            </select>
        </div><div className="addinpt">
            <label>Expense:</label>
            <input type="number" value={expense} onChange={(e)=>setExpense(e.target.value)}/>
        </div>
        <button type="submit">Add</button>
    </form>
   </div>
  )
}

export default Eventwise