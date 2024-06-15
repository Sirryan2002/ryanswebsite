import { useEffect } from 'react';
import Sidebar from "../components/Sidenav";

function Intro() {
  // Placeholder for any introductory scripts or animations
}

export default function Home() {
  useEffect(() => Intro(),[]);

  const handleScroll = () => {
    document.getElementById("who-i-am").scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <WebsiteContainer>
      <HomePage handleScroll={handleScroll} />
    </WebsiteContainer>
  );
}

const HomePage = ({ handleScroll }) => {
  const blurbs = {
    "my_story" : "Hi! I'm Ryan Longo, a senior at Michigan State University with a passion for economics and education policy.\
    I've always been fascinated by how public policy shapes our world, and I'm eager to make a difference in Michigan. Outside \
    of my academics, I love being part of the breakdancing community in East Lansing and pursuing various passion projects (such as this website). \
    My current professional work is in the food service industry at various restaurants which have taught me valuable skills in leadership \
    and customer service. Ultimately, my goal is to use my experiences to improve Michigan's education system and create \
    positive change in my community."
  };
  
  return (
    <>
      <header id='NavBar'>
        <img src={'/initials.png'} alt="Initials"/>
        <nav>
            <a href="#home" className="Header-nav-item">Home</a>
            <a href="#resume" className="Header-nav-item">Resume</a>
            <a href="#projects" className="Header-nav-item">Projects</a>
            <a href="#services" className="Header-nav-item">Services</a>
            <a href="#contact" className="Header-nav-item">Contact</a>
        </nav>
      </header>
      <div className="name_splash">
        <span><b>RYAN LONGO</b></span>
        <span>Student & Chronic Hobbyist</span>
        <div className="scroll-indicator" onClick={handleScroll}>
          <div className="scroll-indicator-text">{"< Learn More About Me >"}</div>
        </div>
      </div>
      <div className="titleimage-container">
        <img className="titleimage" src={'/breaking4.png'} alt="Background"/>
      </div>
      <section id="who-i-am" className="section who-i-am">
        <h2>Who I Am</h2>
        <p>{blurbs.my_story}</p>
      </section>
      <section id="learn-more" className="section learn-more">
        <h2>Learn More About Me</h2>
        <div className="cards">
          <a href="#resume" className="card">
            <img src="/resume-icon.jpg" alt="Resume" className='card-img'/>
            <div className="card-content">
              <h3>Resume</h3>
              <p>Check out my professional experiences and skills.</p>
            </div>
          </a>
          <a href="#projects" className="card">
            <img src="/projects-icon.png" alt="Projects" className='card-img'/>
            <div className="card-content">
              <h3>Projects</h3>
              <p>Explore the projects I have worked on.</p>
            </div>
          </a>
          <a href="#services" className="card">
            <img src="/services-icon.png" alt="Services" className='card-img'/>
            <div className="card-content">
              <h3>Services</h3>
              <p>Discover the services I offer.</p>
            </div>
          </a>
        </div>
      </section>
      <section id="contact" className="section contact">
        <h2>Contact Me</h2>
        <p>Feel free to reach out to me via the contact form below.</p>
        <form>
          <input type="text" name="name" placeholder="Your Name"/>
          <input type="email" name="email" placeholder="Your Email"/>
          <textarea name="message" placeholder="Your Message"></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      <footer>
        <p>&copy; {new Date().getFullYear()} Ryan Longo. All rights reserved. | Licensed under MIT License.</p>
      </footer>
    </>
  );
};

const WebsiteContainer = ({ children }) => {
  return (
    <div className="website-container">
      {children}
    </div>
  );
};
