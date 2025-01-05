import React from 'react'

const event = () => {
  return (
    <div class="addform">
    <form action="">
        <div class="addinpt">
            <label for="">Date:</label>
            <input type="date"/>
        </div>
        <div class="addinpt">
            <label for="">Bill No:</label>
            <input type="text"/>
        </div>
        <div class="addinpt">
            <label for="">Particular:</label>
            <input type="text"/>
        </div>
        <div class="addinpt">
            <label for="">Expense:</label>
            <input type="number"/>
        </div>
        <button type="submit">Add</button>
    </form>
   </div>
  )
}

export default event