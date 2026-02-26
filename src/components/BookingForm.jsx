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
            setError('Du måste välja datum & tid');
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
    })
        .replace('.', '');

    // Tiden visas som dropdown med 30 min intervall. 

    const generateTimes = () => {
        const times = [];

        for (let hour = 12; hour <= 22; hour++) {
            times.push(`${hour.toString().padStart(2, '0')}:00`);
            times.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        return times;
    };

    const timeOptions = generateTimes();

  return (
    <div className='booking-form'>

        {/* WHEN, WHAT & WHO */}
        <div className='section-header'>
            <div className='line'></div>
            <h2>WHEN, WHAT & WHO</h2>
            <div className='line'></div>
        </div>

        <div className='row'>
            <div className='input-wrapper'>
            <label>Date</label>

            <input className='display-input'
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
            className='hidden-date'
            />   
            </div>

        <div className='input-wrapper'>
            <label>Time</label>

            <select className='time-input'
                value={time}
                onChange={(e) => setTime(e.target.value)}
            >
                <option value="">Select time</option>
                {timeOptions.map((t) => (
                    <option key={t} value={t}>
                        {t.replace(':', '.')}
                    </option>
                ))}
            </select>
         </div>   
         </div>
        
        {/* PLAYERS & LANES */}

        <div className='form-group'>
            <label>Number of awsome bowlers</label>
            <input 
            type="number"
            min='1'
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))} 
            />
        </div>

        <div className='form-group'>
            <label>Number of lanes</label>
            <input 
            type="number"
            min='1'
            value={lanes}
            onChange={(e) => setLanes(Number(e.target.value))}
            />
        </div>


                {/* SHOES */}

        <div className='section-header'>
            <div className='line'></div>
            <h2>SHOES</h2>
            <div className='line'></div>
        </div>

        <div className='shoes-container'>
            {Array.from({ length: people }).map((_, index) => (
                <select
                    key={index}
                    className='shoe-select'
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
        </div>

        {isLoading && <p>Loading...</p>}

        <button className='strike-button'
        onClick={handleClick}>
            STRIIIIIIKE!
        </button>

        {error && <p className='error-message'>{error}</p>}
    </div>
  )
}

export default BookingForm