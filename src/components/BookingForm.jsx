import React, { useState, useEffect } from 'react'
import { createBooking } from '../services/api';
import { useNavigate } from 'react-router-dom';

function BookingForm() {

    const navigate = useNavigate();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState(0); 
    const [lanes, setLanes] = useState(0);
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
            setError('Välj datum och tid för att komma vidare');
            setIsLoading(false);
            return;
        }

        if (shoes.length !== people || shoes.includes('')) {
            setError('Välj skostorlek för alla spelare');
            setIsLoading(false)
            return;
        }

        if (people < 1 || lanes < 1) {
            setError('Du måste välja minst 1 spelare och 1 bana');
            setIsLoading(false);
            return;
        }

        if (people > lanes * 4) {
            setError('Max 4 spelare/bana!');
            setIsLoading(false);
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
            placeholder={formattedDate ? '' : 'Select date'}
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
            <label className='time-label'>Time</label>

            <select className={`time-input ${time ? 'has-value' : ''}`}
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

        <div className='input-wrapper full-width'>
            <label>Number of awsome bowlers</label>

            <select
                className={`number-select ${people === 0 ? '' : 'has-value'}`}
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
            >
                <option value={0}>0</option>

                {Array.from({length: 12 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
            </div>
            

        <div className='input-wrapper full-width'>
            <label>Number of lanes</label>

            <select
                className={`number-select ${lanes === 0 ? '' : 'has-value'}`}
                value={lanes}
                onChange={(e) => setLanes(Number(e.target.value))}
            >
                <option value={0}>0</option>

                {Array.from({length: 10 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>
        </div>


                {/* SHOES */}

        <div className='section-header'>
            <div className='line'></div>
            <h2>SHOES</h2>
            <div className='line'></div>
        </div>

        <div className='shoes-container'>
            {Array.from({ length: people }).map((_, index) => (
                <div key={index} className='input-wrapper full-width'>

                    <label>Shoe size / Person {index + 1}</label>
                
                <select
                    className={`shoe-select ${shoes[index] ? 'has-value' : ''} `}
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

                    <option key={size} value={size}>
                        Euro {size}
                        </option>
                    ))}    
                </select>
                </div>
            ))}
        </div>

        {isLoading && <p className='loading-message'>Loading...</p>}

        {error && <p className='error-message'>{error}</p>}

        <button className='strike-button'
        onClick={handleClick}>
            STRIIIIIIKE!
        </button>

        
    </div>
  )
}

export default BookingForm