import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Nav() {

    const [isOpen, setIsOpen] = useState(false); 

    return (
    <nav className='nav'>
        <button className='nav-menu'
            onClick={() => setIsOpen(!isOpen)}>
                <span className='bar bar1'></span>
                <span className='bar bar2'></span>
                <span className='bar bar3'></span>
        </button>

        {isOpen && (
            <div className='nav-links'>
                <Link to='/' onClick={() => setIsOpen(false)}>
                Booking
                </Link>
                <Link to='/confirmation'
                onClick={() => setIsOpen (false)}
                >
                    Confirmation
                </Link>
            </div>
        )}

    </nav>
  );
}

export default Nav