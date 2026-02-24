import React from 'react'
import Booking from './pages/Booking'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
       
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Booking />} />
        </Routes>
        
    </BrowserRouter>

  )
}

export default App