import React, { useState, useEffect } from 'react'
import { createBooking } from '../services/api';

function BookingForm() {

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState(1); 
    const [lanes, setLanes] = useState(1);
    const [shoes, setShoes] = useState([]); //array

    const total = people * 120 + lanes * 100;

    useEffect(() => {
        setShoes((prevShoes) => prevShoes.slice(0, people));
    }, [people]);

    const handleClick = async () => {
        try {
            const bookingData = {
                date,
                time,
                people,
                lanes,
                shoes,
            };

            const result = await createBooking(bookingData);

            console.log('Booking success:', result);
        }   catch (error) {
            console.log('Booking failed:', error.message);
        }
    };

    // const handleClick = () => {
    //     console.log({ date, time, people, lanes, shoes });
    // };


  return (
    <div>
        <input
        type="date"
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        />

        <input 
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)} 
        />

        <input 
        type="number"
        min='1'
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))} 
        />

        <input 
        type="number"
        min='1'
        value={lanes}
        onChange={(e) => setLanes(Number(e.target.value))}
        />


        {Array.from({ length: people }).map((_, index) => (
        <select
            key={index}
            value={shoes[index] || ''}
            onChange={(e) => {
                const newShoes = [...shoes];
                newShoes[index] = e.target.value;
                setShoes(newShoes);
            }}
            >
                {/* Dropdown list */}
            <option value=''>Select size</option> 

                {Array.from({ length: 18 }, (_, i) => 30 + i).map((size) => (

            <option key={size} value={size}>{size}</option>
            ))}    
        </select>

        ))}

        <button
        onClick={handleClick}>STRIIIIIKE!
        </button>
        <p>Temporary total: {total} kr</p>
    </div>
  )
}

export default BookingForm