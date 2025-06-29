// index.js
import { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import WebsiteContainer from '@/components/Container';

function Intro() {
  // Placeholder for any introductory scripts or animations
}

export default function Home() {
  useEffect(() => Intro(), []);

  const handleScroll = () => {
    document.getElementById("who-i-am").scrollIntoView({ behavior: 'smooth' });
  };

  const blurbs = {
    "my_story1": "I'm a data analyst and education policy advocate dedicated to strengthening Michigan's educational landscape. \
    As a recent graduate of Michigan State University's James Madison College, I earned dual bachelor's degrees in Social Relations \
    & Policy and Economics, with a specialized focus in Educational Studies & Policy. Currently serving as a Data Analyst at \
    Michigan Virtual, I apply my analytical expertise to support virtual learning initiatives across the state. My professional \
    experience spans multiple sectors of Michigan's education system, from substitute teaching in Lansing Public Schools to conducting \
    legislative research as an intern with the Michigan Elementary & Middle School Principals Association (MEMSPA), where I \
    developed comprehensive policy briefs on education legislation and utilized geospatial analysis to identify opportunities for \
    improved administrator representation.",
    "my_story2" : "My technical proficiency encompasses full-stack web development, data analysis, and database management, with expertise \
    in Python, R, JavaScript, and various web technologies. I have successfully led website development projects for MSU's \
    STEMed+ Department and served as Secretary-General of MSU Model United Nations, where I managed a 95-member nonprofit \
    organization and coordinated multiple conferences. Beyond my professional pursuits, I'm an active member of East Lansing's \
    breakdancing community and maintain a passion for creative projects, including the development of this website. My diverse \
    experiences—from grassroots community engagement to data-driven policy analysis—inform my commitment to creating positive \
    change in Michigan's education system through research-grounded solutions and collaborative leadership."
  };

  return (
    <WebsiteContainer>
      <Head>
        <title>Ryan Longo - Home</title>
        <meta property="og:title" content="Ryan Longo - Home" />
        <meta property="og:description" content="Hi I'm Ryan Longo! I'm a Data Analyst, Breakdancer, Developer, and Education Advocate. This website will tell you all about me and what I'm all about." />
        <meta property="og:image" content="https://ryanlongo.net/breaking4.png"/>
        <meta property="og:url" content="https://ryanlongo.net/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Ryan Longo's Portfolio"/>
        <meta property="og:locale" content="en_US"/>
      </Head>
      <NavBar />
      <HomePage handleScroll={handleScroll} blurbs={blurbs} />
      <Footer />
    </WebsiteContainer>
  );
}

const HomePage = ({ handleScroll, blurbs }) => {
  return (
    <div id="main_page">
      <HeroSection handleScroll={handleScroll} />
      <section id="who-i-am" className="section">
        <div className="content-container">
          <h2>Who I Am</h2>
          <p>{blurbs.my_story1}</p>
          <p>{blurbs.my_story2}</p>
        </div>
      </section>
      <section id="learn-more" className="section-light">
        <div className="content-container">
          <h2>Learn More About Me</h2>
          <div className="cards">
            <Card
              href="/resume"
              imgSrc="/resume-icon.jpg"
              imgAlt="Resume"
              title="Resume"
              description="Check out my professional experiences and skills."
              size="medium"
            />
            <Card
              href="/portfolio"
              imgSrc="/projects-icon.png"
              imgAlt="Projects"
              title="Portfolio"
              description="Explore the projects I have worked on."
              size="medium"
            />
            <Card
              href="https://www.linkedin.com/in/ryan-longo-094454239/"
              imgSrc="/linkedin-icon.jpg"
              title="LinkedIn"
              imgAlt="LinkedIn"
              description="Connect with me on LinkedIn."
              size="medium"
            />
          </div>
        </div>
      </section>
      <section id="contact" className="section">
        <div className="content-container">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

const HeroSection = ({ handleScroll }) => {
  const [currentLabel, setCurrentLabel] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Labels that cycle through
  const labels = [
    'Breakdancer',
    'Developer', 
    'Amateur Baker',
    'Academic',
    'Educator',
    'Policy Advocate',
    'Web Designer',
    'Chronic Hobbyist',
    'MSU Spartan',
    'Coffee Enthusiast'
  ];

  // Shuffle array function
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Create a shuffled order for this page load
    const shuffledLabels = shuffleArray(labels);
    let currentIndex = 0;

    // Set initial label
    setCurrentLabel(shuffledLabels[0]);

    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % shuffledLabels.length;
        setCurrentLabel(shuffledLabels[currentIndex]);
        setIsAnimating(false);
      }, 250); // Half of animation duration
      
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-container">
      <div className="hero-background">
        <img className="hero-image" src={'/breaking4.png'} alt="Ryan Longo breakdancing" />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">RYAN LONGO</h1>
          <div className="hero-subtitle">
            <span className="static-text">Data Analyst & </span>
            <span className={`dynamic-text ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              {currentLabel}
            </span>
          </div>
        </div>
        
        <button className="hero-cta" onClick={handleScroll}>
          <span>Learn More About Me</span>
          <i className="scroll-arrow">↓</i>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('/api/sendContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setIsConfirming(false);
        setError('');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <>
      <h2>Contact Me</h2>
      <p>Feel free to reach out to me via the contact form below.</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>
        <div className="form-group">
          <textarea 
            name="message" 
            placeholder="Your Message" 
            value={formData.message} 
            onChange={handleChange} 
            required
            className="form-textarea"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="form-submit">Send Message</button>
      </form>
      
      {isConfirming && (
        <div className="confirmation-modal">
          <div className="modal-content" >
            <p style={{color : 'black'}}>Are you sure you want to send this message?</p>
            <div className="modal-actions">
              <button onClick={handleConfirm} className="btn-confirm">Confirm</button>
              <button onClick={() => setIsConfirming(false)} className="btn-cancel">Cancel</button>
            </div>
          </div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </>
  );
};