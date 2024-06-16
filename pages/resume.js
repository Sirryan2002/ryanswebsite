import Head from 'next/head';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Resume = () => {
  return (
    <div>
      <Head>
        <title>Resume - Ryan Longo</title>
        <meta name="description" content="Resume of Ryan Longo" />
      </Head>
      <NavBar />
      <section id="resume" className="section resume">
        <h2>My Resume</h2>
        <div className="resume-content">
          <h3>Ryan Longo</h3>
          <p>129 Stoddard Ave, East Lansing • (616) 824-1182 • longorya@msu.edu</p>
          
          <h3>Education</h3>
          <p><strong>Michigan State University, James Madison College</strong> - December 2024</p>
          <ul>
            <li>B.A. Social Relations & Policy - GPA 3.76/4.00</li>
            <li>B.A. Economics - GPA 3.91/4.00</li>
            <li>Specialization in Educational Studies & Policy</li>
          </ul>

          <h3>Professional Experience</h3>
          <div className="experience">
            <img src="/msumun-logo.png" alt="MSU Model United Nations 501c3" className="company-logo" />
            <div>
              <p><strong>MSU Model United Nations 501c3</strong> - September 2021-Present</p>
              <ul>
                <li>Lead a 501c3 non-profit of 95 employees to provide education on international policy writing and public speaking skills to midwestern middle and high school students.</li>
                <li>Coordinate an executive board to organize logistics and advertising of 2 conferences.</li>
                <li>Redesigned the organization's website and implemented new financial controls in-line with IRS 501(c)(3) regulations to return the organization to a positive net income.</li>
              </ul>
            </div>
          </div>

          <div className="experience">
            <img src="/cz-logo.webp" alt="Comfort Zone Cigar Lounge & Bistro" className="company-logo" />
            <div>
              <p><strong>Comfort Zone Cigar Lounge & Bistro</strong> - October 2023-Present</p>
              <ul>
                <li>Engage guests with personalized service, memorizing names and preferences to foster a welcoming atmosphere.</li>
                <li>Drive sales by expertly recommending menu items, upselling products, and suggesting drink pairings tailored to individual tastes.</li>
                <li>Cultivate loyalty by promoting house cocktails, liquors, and wine selections, resulting in increased revenue and guest satisfaction.</li>
              </ul>
            </div>
          </div>

          <div className="experience">
            <img src="/chipotle-logo.png" alt="Chipotle Mexican Grill" className="company-logo" />
            <div>
              <p><strong>Chipotle Mexican Grill</strong> - April 2022-October 2023</p>
              <ul>
                <li>Lead kitchen operations, ensuring strict adherence to food quality standards, ingredient safety, and sanitation protocols, consistently achieving high ecosure audit scores.</li>
                <li>Exhibited leadership by guiding and training team members in maintaining kitchen cleanliness and completing long-term kitchen maintenance tasks.</li>
              </ul>
            </div>
          </div>

          <h3>Skills & Certifications</h3>
          <ul>
            <li>2 Years Data Science Experience; Proficient in R-Studio, Python, SQL, and RDMS’s</li>
            <li>Proficient in Microsoft Office Products such as Excel, Word, Powerpoint, & Teams</li>
            <li>Experience in Graphic & Website Design; Proficient with Squarespace, Weebly, Javascript, ReactJS, HTML, and CSS based coding languages</li>
          </ul>
        </div>
        <h3>Resume PDF</h3>
        <iframe 
          src="/resume.pdf" 
          width="100%" 
          height="1000px" 
          style={{ border: 'none' }}
          title="Ryan Longo Resume"
        ></iframe>
      </section>
      <Footer />
    </div>
  );
};

export default Resume;
