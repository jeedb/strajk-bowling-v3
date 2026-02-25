import React from 'react'

function BookingDetails({ booking }) {

  const formattedDate = new Date(booking.date).toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div>
        <p>Date: {formattedDate}</p>
        <p>Time: {booking.time}</p>
        <p>People: {booking.people}</p>
        <p>Lanes: {booking.lanes}</p>
        <p>Booking number: {booking.bookingId}</p>
        <p>Total: {booking.price} kr</p>
        
    </div>
  );
}

export default BookingDetails