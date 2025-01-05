import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Addform = () => {
  const [date,setDate] = useState('');
  const [givenby,setGivenby] = useState('')
  const [amount,setAmount] = useState('')
  const [records,setRecords] = useState([])

  const fetchrec=async ()=>{
    try{
      const response = await axios.get('http://localhost:3001/all')
      setRecords(response.data)
      console.log(response.data)
    }catch{
      console.log('err in fetch')
    }
  }
  useEffect(() => {
    fetchrec();
  }, []);

  const handlesubmit = async (e)=>{
    e.preventDefault()
    if(!date || !givenby || !amount || amount < 0)
    {
      alert('enter valid inputs')
    }
    else{
      const amt =(parseFloat(amount).toFixed(2))
      alert(amt)
      try {
        const response = await axios.post('http://localhost:3001/addform', { date, givenby, amount:amt });
  
        if (response.status === 200) {
          alert('Amount added successfully');
          setDate('');
          setGivenby('');
          setAmount('');
        }
      } catch (error) {
        console.error('Error adding amount:', error);
        alert('Failed to add the amount');
      }
  }
  
  }
  return (
    <div className="addform">
    <form action="" onSubmit={handlesubmit}>
        <div className="addinpt">
            <label>Date:</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className="addinpt">
            <label>Given By:</label>
            <input type="text" value={givenby} onChange={(e)=>setGivenby(e.target.value)}/>
        </div>
        <div className="addinpt">
            <label>Amount:</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        </div>
        <button type="submit">Add</button>
        <div className="addinpt">{date}</div>
    </form>
  </div>
  )
}

export default Addform