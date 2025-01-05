import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '..//App.css'

const Treasurerslogin = () => {

  const nav = useNavigate()

  const [uname,setUname] = useState('')
  const [reg,setReg] = useState('')
  const [pwd,setPwd] = useState('')
  const handlsubmit = async(e)=>{
    e.preventDefault();
    if(!uname || !reg || !pwd)
    {
      alert("Enter Valid Inputs")
    }
    else{
      try{
        const res = await axios.post('http://localhost:3001/tlogin',{username:uname.toLowerCase(),reg:reg,password:pwd})
        alert("login successfully!")
        if(res.data.message === "correct"){
          nav('/option/treasurer')
        }
      }
      catch{
        alert("Entered Credentials Are Wrong")
      }
    }
  }
  return (
    <div className="mlogin">
        <p>Treasurers Login</p>
        <form action="" onSubmit={handlsubmit}>
          <div className="inpts">
            <input type="text" value={uname} onChange={(e)=>setUname(e.target.value)}/>
            <label>Name</label>
          </div>
          <div className="inpts">
            <input type="text" value={reg} onChange={(e)=>setReg(e.target.value)}/>
            <label>Register no</label>
          </div>
          <div className="inpts">
            <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
            <label>Password</label>
          </div>
          <button type="submit" className="btn">submit</button>
        </form>
    </div>
  )
}

export default Treasurerslogin