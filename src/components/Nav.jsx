import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Nav() {

    const [isOpen, setIsOpen] = useState(false); 

    return (
    <nav className='nav'>
        <button className='nav-menu'
            onClick={() => setIsOpen(!isOpen)}>
                &#9776;
        </button>

        {isOpen && (
            <div>
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