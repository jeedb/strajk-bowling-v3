import React from 'react'
import { useLocation } from 'react-router-dom'
import BookingDetails from '../components/BookingDetails';
import Nav from '../components/Nav';

function Confirmation() {

    const location = useLocation();
    const bookingData = location.state;

    if (!bookingData) {
        return <p>No booking found.</p>;
    }

  return (
    <>
      <Nav />
        <div>
          <h1>Confirmation</h1>
          <BookingDetails booking={bookingData} />
        </div>
    </>
  )
}


export default Confirmation