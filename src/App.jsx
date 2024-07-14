import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthState from './context/auth/AuthState'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <><AuthState>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/login' element = {<Login/>} />
      </Routes>
      
      </BrowserRouter>
      </AuthState>
    </>
  )
}

export default App
