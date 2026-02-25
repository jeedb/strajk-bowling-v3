import React from 'react'
import BookingForm from '../components/BookingForm'
import Nav from '../components/Nav';

function Booking() {


  return (
    <>
      <Nav />
        <div>
          <h1>BOOKING</h1>
          <BookingForm />
        </div>
    </>
  );
}

export default Booking