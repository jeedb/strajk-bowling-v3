import React from 'react'

function BookingDetails() {

  return (
    <div>
        <p>Date: {booking.date}</p>
        <p>Time: {booking.time}</p>
        <p>People: {booking.people}</p>
        <p>Lanes: {booking.lanes}</p>
        <p>Total: {booking.total}</p>
        <p>Booking number: {booking.bookingNumber}</p>
    </div>
  );
}

export default BookingDetails