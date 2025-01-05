import React, { useState } from 'react'

const View = () => {
  return (
    <div className="addform">
    <form action="">
        <div className="addinpt">
            <label>Date:</label>
            <input type="date"/>
        </div>
        <div className="addinpt">
            <label>Event:</label>
            <input type="text"/>
        </div>
        <div className="addinpt">
            <label>Bill No:</label>
            <input type="text"/>
        </div>
        <div className="addinpt">
            <label>Particular:</label>
            <input type="text"/>
        </div>
        <div className="addinpt">
            <label>Givento:</label>
            <input type="text"/>
        </div>
        <div className="addinpt">
            <label>Expense:</label>
            <input type="number"/>
        </div>
        <button type="submit">Add</button>
    </form>
   </div>
  )
}

export default View