import Image from 'next/image';
import Card from "../components/Card";
import ReactDOM from 'react-dom';

if (typeof window !== 'undefined') {
  let intro = document.querySelector('.intro')
  let navbar = document.querySelector('.sidenav-contents')
  let namehi = document.querySelector('#name-hi')
  let myname = document.querySelector('#my-name')
  let namecontainer = document.querySelector('#name-container')
  navbar.style.opacity = 0
  document.addEventListener('DOMContentLoaded', ()=> {
    setTimeout(()=> {
      setTimeout(()=> {
        namehi.style.opacity = 1
      }, 1000)
      setTimeout(()=> {
        myname.style.opacity = 1
      }, 2000)
      setTimeout(()=> {
        intro.style.left = '-100vw'
        namecontainer.style.opacity = 0
      }, 4000)
      setTimeout(()=> {
        navbar.style.opacity = 1
        namecontainer.remove()
        intro.remove()
      }, 6500)
    })
  })
}

export default function Home() {
  return (
    <WebsiteContainer>
      <Sidebar/>
      <HomePage/>
    </WebsiteContainer>
  )
}

export const WebsiteContainer = (props, context) => {
  const { as = 'div', children, ...rest } = props;
  return (
    <div class="website-container">
      {children}
    </div>
  )
}

export const Sidebar = (props, context) => {
  return (
    <header>
      <div className="sidenav">
        <div className="sidenav-contents">
          <span class={"d-none d-lg-block"}><Image src="/headerback.jpg" width="160" height="160" class={"sidenav-profile"} /></span>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Experience</a>
          <a href="#">Education</a>
          <a href="#">Skills</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </header>
  )
}

export const HomePage = (props, context) => {
  return (
    <>
      <div id="name-container">
        <span id="name-hi">Hi, <span id="my-name"> I&#x27;m <span id="my-name-ryan">Ryan</span></span></span>
      </div>
      <div className="intro"></div>
      <div className="mainpage-content-container">
        <div className="mainpage-content-resume">
          <a class="textOverImage" data-text="My Work Experience">
            <img src="/gerber.jpg" className="splash-image"/>
          </a>
        </div>
        <div className="mainpage-content-friends">
          <a class="textOverImage" data-text="My Friends">
          <img src="/myfriends.jpg" className="splash-image"/>
          </a>
        </div>
        <div className="mainpage-content-projects">
          <a class="textOverImage" data-text="My Projects">
          <img src="/cmdpicture.png"  className="splash-image"/>
          </a>
        </div>
        <div className="mainpage-content-breaking">
          <a class="textOverImage" data-text="My Breaking">
            <img src="/breaking.jpg" className="splash-image"/>
          </a>
        </div> 
      </div>
    </>
  )
}

