import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import WebsiteContainer from '@/components/Container';

const Resume = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState('experience');

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const experiences = [
    {
      id: 'michigan-virtual',
      company: 'Michigan Virtual',
      logo: '/MichiganVirtualLogo.jpg',
      position: 'Data Analyst',
      period: 'May 2025 - Present',
      type: 'Full-time',
      location: 'East Lansing, MI',
      description: 'Leading data analysis initiatives for K-12 digital learning across Michigan',
      responsibilities: [
        'Query and extract data from complex datasets to provide actionable insights supporting Michigan Virtual\'s K-12 digital learning initiatives',
        'Build and maintain critical reports and dashboards using SQL Server Management Studio and SSRS',
        'Collaborate cross-functionally with research, technology, and program delivery teams',
        'Ensure compliance with Michigan Department of Education reporting requirements and data privacy regulations'
      ],
      skills: ['SQL', 'SSRS', 'Data Analysis', 'Dashboard Development', 'FERPA Compliance'],
      projects: []
    },
    {
      id: 'edustaff',
      company: 'EduStaff',
      logo: '/edustaff_llc_logo.jpg',
      position: 'Substitute Teacher (Lansing Public Schools)',
      period: 'March 2025 - May 2025',
      type: 'Contract',
      location: 'Lansing, MI',
      description: 'Direct classroom experience in Michigan public schools',
      responsibilities: [
        'Assist educators in LPS by providing substitute teaching services',
        'Provide learning opportunities and cognitive development for K-12 students',
        'Gained direct experience at the frontline of Michigan public schools'
      ],
      skills: ['Classroom Management', 'Student Engagement', 'Educational Support'],
      projects: []
    },
    {
      id: 'msu-stemed',
      company: 'MSU STEMed+ Department',
      logo: '/spartan-logo.png',
      position: 'Undergraduate Website Assistant',
      period: 'June 2024 - Present',
      type: 'Part-time',
      location: 'East Lansing, MI',
      description: 'Web development and digital marketing for university STEM education initiatives',
      responsibilities: [
        'Drive development of website on the commons.msu.edu platform',
        'Collaborate with University experts to advertise & support MSU\'s STEAMpower Project',
        'Leverage WordPress CMS to produce effective & intelligently-designed websites'
      ],
      skills: ['WordPress', 'Web Development', 'Digital Marketing', 'CMS Management'],
      projects: ['steamed-website'] // Link to portfolio project
    },
    {
      id: 'msu-mun',
      company: 'MSU Model United Nations 501c3',
      logo: '/msumun-logo.png',
      position: 'Secretary-General',
      period: 'September 2021 - March 2025',
      type: 'Leadership',
      location: 'East Lansing, MI',
      description: 'Led a 95-member nonprofit organization coordinating international relations conferences',
      responsibilities: [
        'Led a 501c3 non-profit organization of 95 members',
        'Coordinated logistics and advertising for 2 major conferences',
        'Redesigned the organization\'s website and implemented new financial controls',
        'Served as USG of Technology (2023-2024) before becoming Secretary-General'
      ],
      skills: ['Leadership', 'Event Management', 'Financial Management', 'Web Development'],
      projects: ['msu-mun-website'] // Link to portfolio project
    },
    {
      id: 'memspa',
      company: 'MEMSPA',
      logo: '/memspa-logo-vert.webp',
      position: 'Legislative Intern',
      period: 'August 2024 - February 2025',
      type: 'Internship',
      location: 'Lansing, MI',
      description: 'Policy research and analysis for Michigan school administrators',
      responsibilities: [
        'Researched and developed policy briefs on newly enacted education legislation',
        'Conducted data analysis to identify trends and areas for improved membership representation',
        'Leveraged geospatial tools for data visualization and analysis'
      ],
      skills: ['Policy Analysis', 'Research', 'Data Visualization', 'GIS', 'Legislative Research'],
      projects: ['policy-analysis-dashboard'] // Link to portfolio project
    },
    {
      id: 'comfort-zone',
      company: 'Comfort Zone Cigar Lounge & Bistro',
      logo: '/cz-logo.webp',
      position: 'Cocktail Server/Waiter',
      period: 'October 2023 - July 2024',
      type: 'Part-time',
      location: 'East Lansing, MI',
      description: 'Customer service and sales in upscale hospitality environment',
      responsibilities: [
        'Engaged guests with personalized service',
        'Drove sales through expert recommendations and upselling',
        'Promoted house cocktails, liquors, and wine selections'
      ],
      skills: ['Customer Service', 'Sales', 'Hospitality', 'Communication'],
      projects: []
    },
    {
      id: 'freelance',
      company: 'Freelance Data Services',
      logo: '/upwork-logo.png',
      position: 'Data Analyst & Web Scraper',
      period: '2023 - Present',
      type: 'Freelance',
      location: 'Remote',
      description: 'Independent data analysis and web scraping services',
      responsibilities: [
        'Completed web-scraping projects using Python and BeautifulSoup',
        'Formatted and cleaned data for various clients',
        'Delivered high-quality data analysis and reporting solutions'
      ],
      skills: ['Python', 'BeautifulSoup', 'Data Cleaning', 'Web Scraping', 'Data Analysis'],
      projects: ['web-scraping-tools'] // Link to portfolio project
    }
  ];

  const education = {
    institution: 'Michigan State University, James Madison College',
    logo: '/spartan-logo.png',
    degree: 'Dual Bachelor\'s Degrees',
    graduationDate: 'December 2025',
    location: 'East Lansing, MI',
    details: [
      'B.A. Social Relations & Policy - GPA 3.80/4.00',
      'B.A. Economics - GPA 3.91/4.00',
      'Specialization in Educational Studies & Policy'
    ],
    achievements: [
      'Dean\'s List multiple semesters',
      'James Madison College Honors Program',
    ]
  };

  const skills = {
    'Programming & Data': {
      icon: 'bx-code-alt',
      items: [
        { name: 'Python', icon: 'bxl-python', level: 90 },
        { name: 'R', icon: 'bxs-objects-vertical-bottom', level: 85 },
        { name: 'SQL', icon: 'bx-data', level: 88 },
        { name: 'JavaScript', icon: 'bxl-javascript', level: 82 },
        { name: 'HTML5', icon: 'bxl-html5', level: 95 },
        { name: 'CSS3', icon: 'bxl-css3', level: 90 }
      ]
    },
    'Frameworks & Tools': {
      icon: 'bx-wrench',
      items: [
        { name: 'React', icon: 'bxl-react', level: 80 },
        { name: 'Next.js', icon: 'bxl-nextjs', level: 75 },
        { name: 'WordPress', icon: 'bxl-wordpress', level: 85 },
        { name: 'Excel', icon: 'bxl-microsoft', level: 95 },
        { name: 'Tableau', icon: 'bx-bar-chart-alt', level: 70 }
      ]
    },
    'Professional': {
      icon: 'bx-briefcase',
      items: [
        { name: 'Data Analysis', level: 95 },
        { name: 'Policy Research', level: 90 },
        { name: 'Project Management', level: 85 },
        { name: 'Public Speaking', level: 80 },
        { name: 'Leadership', level: 88 }
      ]
    }
  };

  return (
    <WebsiteContainer>
      <Head>
        <title>Resume - Ryan Longo</title>
        <meta name="description" content="Interactive resume of Ryan Longo - Data Analyst, Developer, and Education Advocate" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <div id='resume_page'>
        <NavBar />
        
        {/* Header Section */}
        <section className="resume-header">
          <div className="resume-header-content">
            <div className="resume-intro">
              <h1>Ryan Longo</h1>
              <p className="resume-tagline">Data Analyst & Education Policy Advocate</p>
              <p className="resume-description">
                Transforming data into actionable insights for Michigan&aposs educational landscape
              </p>
              <div className="resume-actions">
                <a href="/resume.pdf" target="_blank" className="btn btn-primary">
                  <i className='bx bx-download'></i> Download PDF
                </a>
                <Link href="/portfolio" className="btn btn-secondary">
                  <i className='bx bx-folder-open'></i> View Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="resume-nav" style={{padding : 0}}>
          <div className="resume-container">
            <div className="resume-tabs">
              <button 
                className={`resume-tab ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                <i className='bx bx-briefcase'></i> Experience
              </button>
              <button 
                className={`resume-tab ${activeTab === 'education' ? 'active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                <i className='bx bx-graduation-cap'></i> Education
              </button>
              <button 
                className={`resume-tab ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <i className='bx bx-cog'></i> Skills
              </button>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="resume-content">
          <div className="resume-container">
            
            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="resume-timeline">
                <h2>Professional Experience</h2>
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="timeline-item">
                    <div className="timeline-marker">
                      <img src={exp.logo} alt={`${exp.company} logo`} />
                    </div>
                    <div className="timeline-content">
                      <div 
                        className="timeline-header"
                        onClick={() => toggleSection(exp.id)}
                      >
                        <div className="timeline-title">
                          <h3>{exp.position}</h3>
                          <h4>{exp.company}</h4>
                          <div className="timeline-meta">
                            <span className="period">{exp.period}</span>
                            <span className="type">{exp.type}</span>
                            <span className="location">{exp.location}</span>
                          </div>
                        </div>
                        <button className="expand-btn">
                          <i className={`bx ${expandedSections[exp.id] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                        </button>
                      </div>
                      
                      <p className="timeline-description">{exp.description}</p>
                      
                      {expandedSections[exp.id] && (
                        <div className="timeline-details">
                          <div className="responsibilities">
                            <h5>Key Responsibilities</h5>
                            <ul>
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="skills-used">
                            <h5>Skills Used</h5>
                            <div className="skill-tags">
                              {exp.skills.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                              ))}
                            </div>
                          </div>
                          
                          {exp.projects.length > 0 && (
                            <div className="related-projects">
                              <h5>Related Projects</h5>
                              <div className="project-links">
                                {exp.projects.map((projectId, i) => (
                                  <Link key={i} href={`/portfolio/${projectId}`} className="project-link">
                                    <i className='bx bx-link-external'></i> View Project
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="education-section">
                <h2>Education</h2>
                <div className="education-card">
                  <div className="education-header">
                    <img src={education.logo} alt="MSU Logo" className="education-logo" />
                    <div className="education-info">
                      <h3>{education.institution}</h3>
                      <h4>{education.degree}</h4>
                      <div className="education-meta">
                        <span className="graduation-date">{education.graduationDate}</span>
                        <span className="location">{education.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="education-details">
                    <div className="degree-details">
                      <h5>Degree Details</h5>
                      <ul>
                        {education.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="achievements">
                      <h5>Achievements</h5>
                      <ul>
                        {education.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="skills-section">
                <h2>Skills & Expertise</h2>
                {Object.entries(skills).map(([category, data]) => (
                  <div key={category} className="skill-category">
                    <h3>
                      <i className={`bx ${data.icon}`}></i>
                      {category}
                    </h3>
                    <div className="skill-grid">
                      {data.items.map((skill, i) => (
                        <div key={i} className="skill-item">
                          <div className="skill-header">
                            {skill.icon && <i className={`bx ${skill.icon}`}></i>}
                            <span className="skill-name">{skill.name}</span>
                          </div>
                          {skill.level && (
                            <div className="skill-bar">
                              <div 
                                className="skill-progress" 
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        <Footer />
      </div>
    </WebsiteContainer>
  );
};

export default Resume;