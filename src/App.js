import React from 'react';
import Header from './components/header'
import Home from './components/home';
import Treasurerslogin from './components/tresurerlogin'
import Memberlogin from './components/memberlogin';
import Moption from './components/moption';
import Toption from './components/toption';
import Addform from './components/addform'
import Eventform from './components/eventform';
import Eventwise from './components/eventwise';
import View from './components/view'
import Overview from './components/overview';
import Files from './components/files';
import Footer from './components/footer';
import login from './img/login.jpg'
import mlogin from './img/mlogin.jpg'
import option from './img/options.jpg'
import addamt from './img/addamt.jpeg'
import download from './img/download.jpg'
import viewdata from './img/accounting.jpg'
import oview from './img/calculate.jpg'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css';



const Appcontent =()=>{ 
  const location = useLocation()
  const getbg = () =>
  {
    switch(location.pathname)
    {
      case '/':
        return `${login}`
      case '/memberlogin':
        return `${mlogin}`
      case '/treasurerlogin':
        return `${mlogin}`  
      case '/option/member':
        return `${option}`
      case '/option/treasurer':
        return `${option}`  
      case '/addform':
        return `${addamt}` 
      case '/viewdata':
        return `${viewdata}`
      case '/overview':
        return `${oview}`   
      case '/files':
        return `${download}`        
      default:
        return `${login}`
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Header />
    <div className='bgimg' style={{position:'relative',background:'black'}}>
      <img src={getbg()} className='imgsrc'/>
    </div>
    <div style={{ flex: 1}} className='hero_container'>     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/treasurerlogin" element={<Treasurerslogin/>} />
          <Route path="/memberlogin" element={<Memberlogin />} />
          <Route path="/option/member" element={<Moption />} />
          <Route path="/option/treasurer" element={<Toption />} />
          <Route path="/addform" element={<Addform />} />
          <Route path="/eventwhole" element={<Eventform />} />
          <Route path="/eventwise" element={<Eventwise />} />
          <Route path="overview" element={<Overview />} />
          <Route path="/viewdata" element={<View />} />
          <Route path="/files" element={<Files />} />
        </Routes>
    </div>
    <Footer />
  </div>
  );
}

function App(){
  return(
  <BrowserRouter>
  <Appcontent/>
  </BrowserRouter>

)}

export default App;