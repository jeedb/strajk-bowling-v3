import React from 'react'
import Booking from './pages/Booking'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Confirmation from './pages/Confirmation'

function App() {

  return (
       
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Booking />} />
            <Route path='/confirmation' element={<Confirmation />} />
        </Routes>
        
    </BrowserRouter>

  )
}

export default App