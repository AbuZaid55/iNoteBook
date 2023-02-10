import React,{useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Header from './Pages/Header.js'
import Home from './Pages/Home.js'
import SignUp from './Pages/SignUp.js'
import Login from './Pages/Login.js'
function App() {
  let [errors,setErrors]=useState('')
  let [success,setSuccess]=useState('')
  let [activenav , setActivenav]=useState('')
  let [navbutton , setnavbutton]=useState(false)
  sessionStorage.setItem("iNoteBookErrors",errors) 
  sessionStorage.setItem("iNoteBookSuccess",success) 
  useEffect(()=>{
    setErrors('')
  },[activenav])
  return (
    <Router>
      <Header activenav={activenav} setactivenav={setActivenav} navbutton={navbutton} setnavbutton={setnavbutton} seterrors = {setErrors} setsuccess={setSuccess} />
          <Routes>
          <Route path='/iNoteBook' element={<Home setactivenav={setActivenav}/>}/>
          <Route path='/iNoteBook/login' element={<Login seterrors = {setErrors} setsuccess={setSuccess} setActivenav={setActivenav}/>}/>
          <Route path='/iNoteBook/signUp' element={<SignUp seterrors = {setErrors} setsuccess={setSuccess} setActivenav={setActivenav}/>}/>
        </Routes>
  </Router>
  )
}

export default App;
