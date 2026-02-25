import React from 'react'

function BookingDetails({ booking }) {

  return (
    <div>
        <p>Date: {booking.date}</p>
        <p>Time: {booking.time}</p>
        <p>People: {booking.people}</p>
        <p>Lanes: {booking.lanes}</p>
        <p>Booking number: {booking.bookingId}</p>
        <p>Total: {booking.price} kr</p>
        
    </div>
  );
}

export default BookingDetails