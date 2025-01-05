import React, {useState } from 'react'
import {Head,Officebearers,Workingcomitee} from './members/data'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Memberlogin = () => {
  
const [members,setMember] = useState('')
const [uname,setUname] = useState('')
const [pwd,setPwd] = useState('')
const getname = (event)=>{
  setMember(event.target.value)
  console.log(members,"member")
}
let list = []
if(members==="Head")
{
  list = Head
}else if(members==="Officebearers"){
  list = Officebearers
}else if(members==="Workingcomitee"){
  list =Workingcomitee
}
const nav = useNavigate()
const handleSubmit = async(e)=>{
  e.preventDefault()
  const res = await axios.post('http://localhost:3001/mlogin',{uname,pwd})
  try{
    if(res.data.message==="correct")
    {
      alert("login successfully!")
      nav('/option/member')
    }
    else{
      alert("wrongg")
    }
  }catch{
    alert("The Entered Credentials Are Wrong")
  }
}
  return (
    <div className="mlogin">
        <p>Member Login</p>
        <form action="" onSubmit={handleSubmit}>
        <div className="minpts">
            <label>Designation:</label>
            <select value={members} onChange={getname}>
              <option value="">--Select--</option>
              <option value="Head">Head</option>
              <option value="Officebearers">Officebearers</option>
              <option value="Workingcomitee">Workingcomitee</option>
            </select>
          </div>
          <div className="minpts">
            <label>Name:</label>
            <select value={uname} onChange={(event)=>setUname(event.target.value)}>
            <option value="">--Select--</option>
             {list.map((li,indx)=>(
              <option key={indx}>{li}</option>
             ))}
            </select>
          </div>
          <div className="minpts">
            <label>Password</label>
            <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} required/>
          </div>
          <button type="submit" className="btn">submit</button>
        </form>
    </div>
  )
}

export default Memberlogin