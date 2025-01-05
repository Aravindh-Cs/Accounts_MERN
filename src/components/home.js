import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handlebtn = (btn)=>{
    if(btn == "btn1"){
      navigate('/memberlogin')
    }else if(btn == "btn2"){
      navigate('/treasurerlogin')
    }else{
      console.log("invalid click")
    }
  }
  return (
    <div className='home'>
        <div>
            <button onClick={()=>handlebtn("btn1")}>Login As Member</button>
            <button onClick={()=>handlebtn("btn2")}>Login As Treasurer</button>
        </div>
    </div>
  )
}

export default Home