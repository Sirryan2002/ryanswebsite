import { useState } from 'react';

import Link from 'next/link'; // Import Link from next.js
import Image from 'next/image';

import initialsPNG from '../public/initials.png';

function NavBar({props, context}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
  };

  return (
      <header id='NavBar'>
          <div className='logo-button-container'>
              <Link href="/" className='initials-container'>
                  <Image src={initialsPNG} alt="Initials" className='initials'/>
              </Link>
              <button className="toggle-button" onClick={toggleNav}>
                  ☰
              </button>
          </div>
          <nav className={isNavOpen ? 'active' : ''}>
              <Link href="/" className="Header-nav-item">Home</Link>
              <Link href="/resume" className="Header-nav-item">Resume</Link>
              <Link href="/portfolio" className="Header-nav-item">Portfolio</Link>
              <Link href="/#contact" className="Header-nav-item">Contact</Link>
          </nav>
      </header>
  )
};

export default NavBar;