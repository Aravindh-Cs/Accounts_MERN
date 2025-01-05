import React from 'react'
import clg from '../img/bhc.png'
import dep from '../img/csa.png'
import '..//App.css'

const header = () => {
  return (
    <>
      <header className='header'>
        <img src={clg} className="img" alt="College Logo"/>
        <p>bishop heber college (autonomous)
            <span>department of computer science</span>
            <span>computer science association shift-i</span>
        </p>
        <img src={dep} className="img" alt="College Logo"/>
      </header>
    </>
  )
}

export default header