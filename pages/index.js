import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div id={"mySidenav"} class={"sidenav"}>
        <span class={"d-none d-lg-block"}><Image src="/headerback.jpg" width="160" height="160" class={"sidenav-profile"}/></span>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Experience</a>
          <a href="#">Education</a>
          <a href="#">Skills</a>
          <a href="#">Contact</a>
      </div><main>
        <div id="dick">
          <h1>Hi, I'm <span id="my_name">Ryan</span></h1>
        </div>

      </main><footer>
        <p>&copy; 2023 Ryan Longo</p>
      </footer></>
  )
}
