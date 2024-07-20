import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AuthState from './context/auth/AuthState'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import Blog from './components/Blog'


function App() {

  return (
    <><AuthState>

      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/login' element = {<Login/>} />
        <Route path = '/register' element = {<RegisterForm/>} />
        <Route path = '/blog' element = {<div className="bg-gray-100 min-h-screen py-8"><Blog/></div>} />
        
  
  
      </Routes>
      
      </BrowserRouter>
      </AuthState>
    </>
  )
}

export default App
