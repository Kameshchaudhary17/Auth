import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import './index.css'
import Landing from './components/Landing'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>

    <Route path='/' element={<Landing/> }/>

    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
