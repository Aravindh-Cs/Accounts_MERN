import axios from 'axios'
import React, { useState } from 'react'
import excel from '../img/excel.png'
import word from '../img/word.png'
import pdf from '../img/pdf.png'

const Files = () => {
    const [fname,setFname] = useState('Amount Sanction History')
    
    const getname = (filename)=>{
        switch(filename){
            case 'Amount Sanction History':
               return 'sanctions'
            case 'EventOverall':
                return 'eventwhole' 
            case 'Bill' :
                return 'bills'
            default: alert("no collection")         
        }
    }
    const handle = async(type)=>
    {
        alert(type)
        const tb = getname(fname)
        console.log(tb)
            try{
                const res = await axios.get(`http://localhost:3001/${type}/${tb}`,{responseType:'arraybuffer'})
                const blob = new Blob([res.data],{type:'application/octet-stream'})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.setAttribute('download',`${fname}.${type}`)
                document.body.appendChild(link)
                link.click();
            }
            catch{
                console.log("err")
            }
    }
  return (
    <div className='files'>
        <div className='select'>
        <select value={fname} onChange={(e) => setFname(e.target.value)}>
          <option value="Amount Sanction History">Amount Sanction History</option>
          <option value="EventOverall">Event Overall</option>
          <option value="Bill">Bill</option>
          <option value="EventWise">Event Wise</option>
        </select>
           <div className='buttons'>
            <button onClick={()=>handle('xlsx')}>Excel <img src={excel}/></button>
            <button onClick={()=>handle('pdf')}>Pdf <img src={pdf}/></button>
            <button onClick={()=>handle('word')}>Word <img src={word}/></button>
            </div>
        </div>
    </div>
  )
}

export default Files