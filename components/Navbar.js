import Link from 'next/link'; // Import Link from next.js

function NavBar({props, context}) {
    return (
        <header id='NavBar'>
        <a href="/">
            <img src={'/initials.png'} alt="Initials"/>
        </a>
        <nav>
            <Link href="/" className="Header-nav-item">Home</Link> {/* Link to projects.js */}
            <Link href="/resume" className="Header-nav-item">Resume</Link> {/* Link to projects.js */}
            <a href="#projects" className="Header-nav-item">Projects</a>
            <a href="#services" className="Header-nav-item">Services</a>
            <a href="#contact" className="Header-nav-item">Contact</a>
        </nav>
      </header>
    )
  }

export default NavBar;