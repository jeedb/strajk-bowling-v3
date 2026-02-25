import React from 'react'

function BookingDetails({ booking }) {

  if (!booking || !booking.when) {
    return <p>No booking data</p>;
  }

console.log(booking)

  const dateObj = new Date(booking.when);

  const formattedDate = dateObj.toLocaleDateString('sv-SE', {
    day: 'numeric',
    month: 'short',
  });

  const formattedTime = dateObj.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
        <p>Date: {formattedDate}</p>
        <p>Time: {formattedTime}</p>
        <p>People: {booking.people}</p>
        <p>Lanes: {booking.lanes}</p>
        <p>Booking number: {booking.bookingId}</p>
        <p>Total: {booking.price} kr</p>
        
    </div>
  );
}

export default BookingDetails