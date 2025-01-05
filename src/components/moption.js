import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import img from '../img/rs.webp'

const Moption = () => {

  const [date,setDate] = useState('')
  const [total,setTotal] = useState()
  const [expense,setExpense] = useState('')
  const [balance,setBalance] = useState('')
  
  const fetchtotal =async ()=>{
    try{
      const res = await axios.get('http://localhost:3001/totalamt')
      const amt = (res.data.totalAmount)
      setTotal(amt)
    }
    catch(err){
      console.log('err',err)
      setTotal('')
    }
  }
  const setdate = ()=>{
    const dtft = new Date()
    const dt = String(dtft.getDate()).padStart(2,'0')
    const mn = String(dtft.getMonth()+1).padStart(2,'0')
    const yr = String(dtft.getFullYear())
    let hrs = String(dtft.getHours()).padStart(2,'0')
    if(hrs>12)
    {
      hrs=String(hrs-12).padStart(2,'0')
    }
    const min = String(dtft.getMinutes()).padStart(2,'0')
    const sec = String(dtft.getSeconds()).padStart(2,'0')
    let apm
    if(hrs>=12)
    {
      apm = 'PM'
    }else{
      apm = 'AM'
    }
    setDate(`${dt}/${mn}/${yr},${hrs}:${min}:${sec} ${apm}`)
  }
  useEffect(()=>{
      setInterval(()=>{
      fetchtotal()
      setBalance(total-expense)
      setdate()
    },1000)
  },[])
  setInterval(()=>{
    setBalance(total-expense)
  },1000)
  return (
    <div className="container">
    <div className="checks">
              <ul>
                <li><p className="time">{date}</p></li>
                <li>Total:<p className="tamt">{total}</p><img src={img}/></li>
                <li>Expense:<p className="eamt">{expense}</p><img src={img}/></li>
                <li>Balance:<p className="bamt">{balance}</p><img src={img}/></li>
              </ul>
    </div>
    <div className="boxes">
               <div className="box">
                  <Link to={'/overview'}><button>accounts overview</button></Link>
                </div>
                <div className="box">
                  <Link to={'/viewdata'}><button>view accounts</button></Link>
                </div>
                <div className="box">
                  <Link to={'/files'}><button>download accounts</button></Link>
                </div>
    </div>
    </div>
  )
}

export default Moption