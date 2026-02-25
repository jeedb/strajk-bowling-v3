import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

function Loading() {

    const navigate = useNavigate();

    useEffect (() => {
        const timer = setTimeout(() => {
            navigate('/booking');
        }, 800);
        
            return () => clearTimeout(timer);
        }, [navigate]);

        return (
            <div className='loading-container'>
                <img className='logo' src={logo} alt='Strajk logo' />

                <h1 className='loading-strajk'>STRAJK</h1>
                <p className='loading-bowling'>BOWLING</p>
            </div>
        )
    
}

export default Loading