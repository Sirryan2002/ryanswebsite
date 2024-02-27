import Sidebar from "../components/Sidenav"
import Head from 'next/head';

export default function Home() {
  
    return (
      <WebsiteContainer>
        <Sidebar/>
        <Projects/>
      </WebsiteContainer>
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

// pages/projects.js



const projects = [
  {
    title: "Space Station 13 Paradise Station Codebase",
    description: "Lead Reviewer and Commit Access of the Paradise Station SS13 codebase. Coded several major features and refactors that improved the gameplay experience for our playerbase.",
    website: "https://www.paradisestation.org/", // Replace "#" with the actual project website URL
    github: "https://github.com/ParadiseSS13/Paradise", // Replace "#" with the actual GitHub repository URL
    image: "/ss13.jpg", // Replace "/ss13.jpg" with the path to the project image
  },
  {
    title: "Paradise Blackbox Helper",
    description: "Built a python library for interacting with and caching data from the SS13 Paradise server's public game round data API which allows for caching of data for thousands of rounds through MySQL relation databases and simple numeric descriptions of data. Has built in helpers for 5 different JSON formats and the 40+ data keys in the blackbox API.",
    website: "#",
    github: "https://github.com/Sirryan2002/paradise-blackbox",
    image: "/blackbox.jpg",
  },
  {
    title: "Red Cedar Model United Nations 501c3 Opening Ceremonies Video",
    description: "Using my video editing expertise, planned, produced, and premiered a 2 and a half minute long video for RCMUN which introduced each of the conferences committees and got the staff and middle school participants hyped up for the day.",
    website: "rcmun.org",
    github: null, // No GitHub repository for this project
    image: "/rcmun.jpg",
  },
  {
    title: "Michigan State University Model United Nations 501c3 Website",
    description: "Using square and my graphic design experience, completely redesigned and implemented a brand new website for the 501c3 organization. This better represented the MUN conference it hosted and make information and resources more accessible. Graphical changes improved the look of the website and the branding of the organization to attract more participants.",
    website: "msumun.org",
    github: null,
    image: "/mun_website.png",
  },
  {
    title: "Boy Scouts of America Eagle Project",
    description: "In order to complete my Eagle Scout rank in Scouts BSA, I planned and executed an Eagle project which involved building a wheelchair accessible ramp for the Friends of the White Pine Trail in Rockford Michigan.",
    website: "#",
    github: null,
    image: "/eagle_project.jpg",
  },
];

const Projects = () => {
  return (
    <div>
      <Head>
        <title>Projects</title>
      </Head>
      <h1>Projects</h1>
      {projects.map((project, index) => (
        <div key={index}>
          <h2>{project.title}</h2>
          <img src={project.image} alt={project.title} />
          <p>{project.description}</p>
          <p>
            <a href={project.website} target="_blank" rel="noopener noreferrer">Website</a>
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer"><img src="/github-icon.png" alt="GitHub" width="20" /></a>}
          </p>
        </div>
      ))}
    </div>
  );
};
