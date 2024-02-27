import Sidebar from "../components/Sidenav"
import { useEffect } from 'react';

function Intro() {
  let seenIntro = parseInt(window.localStorage.getItem('SeenIntro'))
  let intro = document.querySelector('.intro')
  let navbar = document.querySelector('.sidenav-contents')
  let namehi = document.querySelector('#name-hi')
  let myname = document.querySelector('#my-name')
  let namecontainer = document.querySelector('#name-container')
  if (seenIntro !== 1) {
    navbar.style.opacity = 0
    setTimeout(()=> {
      setTimeout(()=> {
        namehi.style.opacity = 1
      }, 2000)
      setTimeout(()=> {
        myname.style.opacity = 1
      }, 3000)
      setTimeout(()=> {
        intro.style.width = '12.5em'
        namecontainer.style.opacity = 0
      }, 5000)
      setTimeout(()=> {
        navbar.style.opacity = 1
        namecontainer.remove()
        intro.remove()
      }, 6500)
    })
    window.localStorage.setItem('SeenIntro', JSON.stringify(1))
  } else {
    setTimeout(()=> {
      namecontainer.remove()
      intro.remove()
    })
  }
}

export default function Home() {
  useEffect(() => Intro(),[])

  return (
    <WebsiteContainer>
      <Sidebar/>
      <HomePage/>
    </WebsiteContainer>
  )
}

const HomePage = (props, context) => {
  return (
    <>
      <div id="name-container">
        <span id="name-hi">Hi, <span id="my-name"> I&#x27;m <span id="my-name-ryan">Ryan</span></span></span>
      </div>
      <div className="intro"></div>
      <div className="mainpage-content-container">
        <div className="mainpage-content-resume">
          <a class="textOverImage" data-text="My Work Experience">
            <img src="/gerber.jpg" className="splash-image" alt="Photo of Ryan posing with coworkers"/>
          </a>
        </div>
        <div className="mainpage-content-friends">
          <a class="textOverImage" data-text="My Friends">
          <img src="/myfriends.jpg" className="splash-image" alt="Photo of Ryan's Friends and Himself"/>
          </a>
        </div>
        <div className="mainpage-content-projects">
          <a class="textOverImage" data-text="My Projects">
          <img src="/cmdpicture.jpg"  className="splash-image" alt="Photo of a windows Command Prompt Console"/>
          </a>
        </div>
        <div className="mainpage-content-breaking">
          <a class="textOverImage" data-text="My Breaking">
            <img src="/breaking.jpg" className="splash-image" alt="Photo of the MSU Breakdance Club"/>
          </a>
        </div> 
      </div>
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
