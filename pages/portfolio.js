import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import Card from '../components/Card';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import WebsiteContainer from '@/components/Container';
import Modal from '@/components/Modal'; // Import the Modal component


export default function Portfolio() {
  return (
    <WebsiteContainer>
        <Head>
            <title>Ryan Longo - Portfolio</title>
        </Head>
      <NavBar />
      <PortfolioContent />
      <Footer />
    </WebsiteContainer>
  );
}



const PortfolioContent = () => {
  return (
    <>
      <Head>
        <title>Projects</title>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <section id="portfolio-cards" className="">
        <div className="cards">
          <Card
            href="/portfolio/coding"
            imgSrc="/services-icon.png"
            imgAlt="Coding Portfolio"
            title="Coding Portfolio"
            description="My freelance and coding projects"
            size="medium"
          />
          <Card
            href="/portfolio/coding"
            imgSrc="/breaking.jpg"
            imgAlt="University Portfolio"
            title="University Portfolio"
            description="My School and Student Organization projects"
            size="medium"
          />
          <Card
            href="/portfolio/coding"
            imgSrc="/cmdpicture.jpg"
            imgAlt="For Fun Portfolio"
            title="For Fun Portfolio"
            description="My projects that I did purely for fun"
            size="medium"
          />
        </div>
      </section>
      <section className='section-light'>
        <center><h1>All Projects</h1></center>
        <ProjectsGallery />
      </section>
    </>
  );
};



const ProjectsGallery = () => {
  const [projects, setProjects] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastProject, setLastProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // State for selected project

  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/projects?${lastProject ? `startAfter=${lastProject.id}` : ''}&limit=8`);
      const data = await res.json();
      if (data.projects.length < 8) {
        setHasMore(false);
      }
      setProjects((prevProjects) => [...prevProjects, ...data.projects]);
      if (data.projects.length > 0) {
        setLastProject(data.projects[data.projects.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjectDetails = async (projectId) => {
    try {
      const res = await fetch(`/api/getProject?id=${projectId}`);
      const data = await res.json();
      console.log(data)
      setSelectedProject(data);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const handleProjectClick = (projectId) => {
    fetchProjectDetails(projectId);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={projects.length}
        next={fetchProjects}
        hasMore={hasMore}
        loader={<h4>Loading Projects...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>No more projects</b>
          </p>
        }
      >
        <div className="projects-container">
          {projects.map((project, index) => (
            <div key={index} className="project-card" onClick={() => handleProjectClick(project.id)}>
              <center><h2>{project.title}</h2></center>
              <img src={project.image} alt={project.title} className="project-image" />
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                <a href={project.website} target="_blank" rel="noopener noreferrer"><i className='bx bx-link-external' style={{"font-size" : "3em"}}></i></a>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <i className='bx bxl-github' style={{"font-size" : "3em"}}></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
};
