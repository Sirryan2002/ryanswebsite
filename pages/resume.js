import Head from 'next/head';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import WebsiteContainer from '@/components/Container';

const Resume = () => {
  return (
    <div>
      <Head>
        <title>Resume - Ryan Longo</title>
        <meta name="description" content="Resume of Ryan Longo" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <NavBar />
      <section id="resume" className="resume">
        <div className="resume-container">
          <div className="header">
            <i className='bx bxs-user header-icon'></i>
            <h1>My Resume</h1>
          </div>
          <div className="resume-content">
            <h3>Education</h3>
            <div className="experience">
              <img src="/spartan-logo.png" alt="Michigan State University Logo" className="company-logo" />
              <div>
                <p><strong>Michigan State University, James Madison College</strong> - December 2024</p>
                <ul>
                  <li>B.A. Social Relations & Policy - GPA 3.76/4.00</li>
                  <li>B.A. Economics - GPA 3.91/4.00</li>
                  <li>Specialization in Educational Studies & Policy</li>
                </ul>
              </div>
            </div>

            <h3>Professional Experience</h3>
            <div className="experience">
              <img src="/msumun-logo.png" alt="MSU Model United Nations 501c3" className="company-logo" />
              <div>
                <p><strong>MSU Model United Nations 501c3</strong> - September 2021-Present</p>
                <p><em>Secretary-General 2024-2025</em></p>
                <p><em>USG of Technology 2023-2024</em></p>
                <ul>
                  <li>Led a 501c3 non-profit of 95 employees.</li>
                  <li>Coordinated logistics and advertising for 2 conferences.</li>
                  <li>Redesigned the organization's website and implemented new financial controls.</li>
                </ul>
              </div>
            </div>

            <div className="experience">
              <img src="/cz-logo.webp" alt="Comfort Zone Cigar Lounge & Bistro" className="company-logo" />
              <div>
                <p><strong>Comfort Zone Cigar Lounge & Bistro</strong> - October 2023-Present</p>
                <p><em>Cocktail Server/Waiter</em></p>
                <ul>
                  <li>Engaged guests with personalized service.</li>
                  <li>Drove sales through expert recommendations and upselling.</li>
                  <li>Promoted house cocktails, liquors, and wine selections.</li>
                </ul>
              </div>
            </div>

            <div className="experience">
              <img src="/chipotle-logo.png" alt="Chipotle Mexican Grill" className="company-logo" />
              <div>
                <p><strong>Chipotle Mexican Grill</strong> - April 2022-October 2023</p>
                <p><em>Kitchen Leader</em></p>
                <ul>
                  <li>Led kitchen operations, ensuring food quality and safety.</li>
                  <li>Trained team members in kitchen maintenance tasks.</li>
                </ul>
              </div>
            </div>

            <div className="experience">
              <img src="/upwork-logo.png" alt="Upwork Logo" className="company-logo" />
              <div>
                <p><strong>Web-Scraping & Data Formatting Freelancing</strong> - 2023-Present</p>
                <p><em>Freelancer</em></p>
                <ul>
                  <li>Completed web-scraping projects using Python and BeautifulSoup.</li>
                  <li>Formatted data for clients on Upwork and Fiverr.</li>
                  <li>Delivered high-quality data analysis and reporting.</li>
                </ul>
              </div>
            </div>

            <h3>Skills & Certifications</h3>
            <div className="skills-section">
              <h4>Programming Languages & Tools</h4>
              <ul className="skills-list">
                <li><i className='bx bxl-html5'></i> HTML5</li>
                <li><i className='bx bxl-css3'></i> CSS3</li>
                <li><i className='bx bxl-javascript'></i> JavaScript</li>
                <li><i className='bx bxl-react'></i> ReactJS</li>
                <li><i className='bx bxl-nextjs'></i> NextJS</li>
                <li><i className='bx bxl-c-plus-plus'></i> C++</li>
                <li><i className='bx bx-data'></i> MySQL</li>
                <li><i className='bx bxl-python'></i> Python</li>
                <li><i className='bx bxs-objects-vertical-bottom'></i> R</li>
              </ul>

              <h4>Software Skills</h4>
              <ul className="skills-list">
                <li><i className='bx bxl-microsoft'></i> Excel</li>
                <li><i className='bx bxl-microsoft'></i> Teams</li>
                <li><i className='bx bxl-microsoft'></i> Word</li>
                <li><i className='bx bxl-google'></i> Google Suite</li>
                <li><i className='bx bxl-wordpress'></i> Wordpress</li>
                <li><i className='bx bxl-squarespace'></i> Squarespace</li>
              </ul>
            </div>
          </div>
          <h3>Resume PDF</h3>
          <iframe 
            src="/resume.pdf" 
            width="100%" 
            height="1000px" 
            style={{ border: 'none' }}
            title="Ryan Longo Resume"
          ></iframe>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Resume;
