
import Link from 'next/link'; // Import Link from next.js

function RLSection({props, context}) {
    return (
    <section id="who-i-am" className="section who-i-am">
        <h2>Who I Am</h2>
        <p>{blurbs.my_story}</p>
      </section>
    )
  }

export default NavBar;