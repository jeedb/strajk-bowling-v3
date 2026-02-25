import React, { useState } from 'react'


function Nav() {

    const [isOpen, setOpen] =useState(false); 

    return (
    <nav>
        <button
            onClick={() => setIsOpen(!isOpen)}>
                &#9776;
        </button>

        {isOpen && (
            <div>
                <Link to='/' onClick={() => setIsOpen(false)}>
                Booking
                </Link>
            </div>
        )}

    </nav>
  );
}

export default Nav