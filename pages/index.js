import Sidebar from "../components/Sidenav"
import { useEffect } from 'react';

function Intro() {
  ///
}

export default function Home() {
  //useEffect(() => Intro(),[])

  return (
    <WebsiteContainer>
      <HomePage/>
    </WebsiteContainer>
  )
}

const HomePage = (props, context) => {
  return (
    <>
      <header id='NavBar'>
        <img></img>
        <nav>
            <a href="#projects" class="Header-nav-item">Home</a>
            <a href="#projects" class="Header-nav-item">Resume</a>
            <a href="#projects" class="Header-nav-item">Projects</a>
            <a href="#projects" class="Header-nav-item">Services</a>
            <a href="#projects" class="Header-nav-item">Contact</a>
        </nav>
      </header>

      
    </>
  )
}

const WebsiteContainer = (props, context) => {
  const { as = 'div', children, ...rest } = props;
  return (
    <div className="website-container">
      {children}
    </div>
  )
}
