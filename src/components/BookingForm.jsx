import React, { useState, useEffect } from 'react'
import { createBooking } from '../services/api';
import { useNavigate } from 'react-router-dom';

function BookingForm() {

    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState(1); 
    const [lanes, setLanes] = useState(1);
    const [shoes, setShoes] = useState([]); //array

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
    setShoes((prevShoes) => prevShoes.slice(0, people));
    }, [people]);

    const total = people * 120 + lanes * 100;


    const handleClick = async () => {
        setIsLoading(true);
        setError('');

        if (!date || !time) {
            setError('Du måste välja datum och tid');
            setIsLoading(false);
            return;
        }

        if (shoes.length !== people || shoes.includes('')) {
            setError('Välj skostorlek för alla spelare');
            setIsLoading(false)
            return;
        }

        try {
            const bookingData = {
                when: `${date}T${time}`,
                lanes,
                people,
                shoes: shoes.map(Number),
            };

            const result = await createBooking(bookingData);
            console.log('API RESULT', result)

            navigate('/confirmation', { 
                state: result.bookingDetails
            });
            
        }   catch (error) {
            setError('Ajdå, det här gick inte som planerat. Gör ett nytt försök!');
            console.log('Booking failed:', error.message);
        }   finally {
            setIsLoading(false);
        }
    };

    const formattedDate = date && new Date (date).toLocaleDateString('sv-SE', {
        day: 'numeric',
        month: 'short',
    });

  return (
    <div>
        {/* <label>Date</label>
        <input
        type="date"
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        /> */}

        <label>Date</label>
        <input 
        type="text"
        value={formattedDate || ''}
        placeholder='Select date'
        readOnly
        onClick={() => document.getElementById('real-date').showPicker()}
        /> 

        <input 
        id="real-date"
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
        }}
         />   

        <label>Time</label>
        <input 
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)} 
        />

        <label>Number of awsome bowlers</label>
        <input 
        type="number"
        min='1'
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))} 
        />

        <label>Number of lanes</label>
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

        {isLoading && <p>Loading...</p>}

        <button
        onClick={handleClick}>
            STRIIIIIKE!
        </button>

        {error && <p className='error-message'>{error}</p>}
    </div>
  )
}

export default BookingForm