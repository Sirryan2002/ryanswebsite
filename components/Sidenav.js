import Image from 'next/image';
import Link from 'next/link'; // Import Link from next.js

function Sidebar({props, context}) {
    return (
        <div className="sidenav">
            <div className="sidenav-contents">
                <header>
                    <span className="d-none d-lg-block"><Image src="/headerback.jpg" width="160" height="160" className="sidenav-profile" /></span>
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Experience</a>
                    <a href="#">Education</a>
                    <Link href="/projects"><a>Projects</a></Link> {/* Link to projects.js */}
                    <a href="#">Contact</a>
                </header>
                <footer>
                    <p>&copy; 2023 Ryan Longo</p>
                </footer>
            </div>
        </div>
      
    )
  }

export default Sidebar;