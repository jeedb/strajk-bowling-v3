import React from 'react'
import Booking from './pages/Booking'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Confirmation from './pages/Confirmation'
import Nav from './components/Nav'
import Loading from './components/Loading'
import './App.css';

function App() {

  return (
       
    <BrowserRouter>
      <Nav />
        <Routes>

            <Route path='/' element={<Loading />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/confirmation' element={<Confirmation />} />
            <Route path='/loading' element={<Loading />} />
        </Routes>
        
    </BrowserRouter>

  )
}

export default App
