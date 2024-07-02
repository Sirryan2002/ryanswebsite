import Link from 'next/link'; // Import Link from next.js

function NavBar({props, context}) {
    return (
        <header id='NavBar'>
        <Link href="/">
            <img src={'/initials.png'} alt="Initials" className='initials'/>
        </Link>
        <nav>
            <Link href="/" className="Header-nav-item">Home</Link> {/* Link to projects.js */}
            <Link href="/resume" className="Header-nav-item">Resume</Link> {/* Link to projects.js */}
            <Link href="/portfolio" className="Header-nav-item">Portfolio</Link>
            <Link href="/services" className="Header-nav-item">Services</Link>
            <Link href="/#contact" className="Header-nav-item">Contact</Link>
        </nav>
      </header>
    )
  }

export default NavBar;