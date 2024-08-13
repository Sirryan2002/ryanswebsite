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
    "my_story": "Hi! I'm Ryan Longo, a senior at Michigan State University with a passion for economics and education policy.\
    I've always been fascinated by how public policy shapes our world, and I'm eager to make a difference in Michigan. Outside \
    of my academics, I love being part of the breakdancing community in East Lansing and pursuing various passion projects (such as this website). \
    My current professional work is in the food service industry at various restaurants which have taught me valuable skills in leadership \
    and customer service. Ultimately, my goal is to use my experiences to improve Michigan's education system and create \
    positive change in my community."
  };

  return (
    <WebsiteContainer>
      <Head>
        <title>Ryan Longo - Home</title>
        <meta property="og:title" content="Ryan Longo - Home" />
        <meta property="og:description" content="Hi I'm Ryan Longo! I'm a MSU student studying Economics and Education Policy. This website will tell you all about me and what I'm all about." />
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
    <>
      <div className="titleimage-container">
      <div className="name_splash">
        <span><b>RYAN LONGO</b></span>
        <span>Student & Chronic Hobbyist</span>
        <div className="scroll-indicator" onClick={handleScroll}>
          <div className="scroll-indicator-text">{"< Learn More About Me >"}</div>
        </div>
      </div>
        <img className="titleimage" src={'/breaking4.png'} alt="Background" />
      </div>
      <section id="who-i-am" className="section">
        <h2>Who I Am</h2>
        <p>{blurbs.my_story}</p>
      </section>
      <section id="learn-more" className="section-light">
        <h2>Learn More About Me</h2>
        <div className="cards">
          <Card
            href="/resume"
            imgSrc="/resume-icon.jpg"
            imgAlt="Resume"
            title="Resume"
            description="Check out my professional experiences and skills."
            size="medium"  // Use medium size for index page
          />
          <Card
            href="/portfolio"
            imgSrc="/projects-icon.png"
            imgAlt="Projects"
            title="Portfolio"
            description="Explore the projects I have worked on."
            size="medium"  // Use medium size for index page
          />
          <Card
            href="/services"
            imgSrc="/services-icon.png"
            title="Services"
            imgAlt="Services"
            description="Discover the services I offer."
            size="medium"  // Use medium size for index page
          />
          <Card
            href="https://www.linkedin.com/in/ryan-longo-094454239/"
            imgSrc="/linkedin-icon.jpg"
            title="LinkedIn"
            imgAlt="LinkedIn"
            description="Connect with me on LinkedIn."
            size="medium"  // Use medium size for index page
          />
        </div>
      </section>
      <section id="contact" className="section">
        <ContactForm />
      </section>
      
    </>
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
    <section id="contact" className="section">
      <h2>Contact Me</h2>
      <p>Feel free to reach out to me via the contact form below.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
        <button type="submit">Send</button>
      </form>
      {isConfirming && (
        <div className="confirmation-modal">
          <p>Are you sure you want to send this message?</p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={() => setIsConfirming(false)}>Cancel</button>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </section>
  );
};
