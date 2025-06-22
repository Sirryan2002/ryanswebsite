import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Head from 'next/head';
import Link from 'next/link';
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import WebsiteContainer from '@/components/Container';
import Modal from '@/components/Modal';

const MAX_DESCRIPTION_LENGTH = 150

export default function Portfolio() {

  const handleScroll = () => {
    document.getElementById("portfolio-title").scrollIntoView({ behavior: 'smooth' });
  };

  const handleInfoClick = () => {
    // You can navigate to an about page or show more info
    // For example: router.push('/about') or open a modal
    console.log("Info button clicked - navigate to about or show more info");
  };

  return (
    <WebsiteContainer>
      <Head>
        <title>Ryan Longo - Portfolio</title>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <NavBar />
      <div className="featuredimage-container">
        {/* Info Button */}
        <div className="info-button" onClick={handleInfoClick}>
          <i className='bx bx-info-circle'></i>
          <div className="info-tooltip">Learn more about me</div>
        </div>

        {/* Enhanced Hero Splash */}
        <div className="portfolio_splash">
          <div className="hero-content">
            <h1>My Portfolio</h1>
            <p>Showcasing innovative solutions through research, community impact, and creative exploration</p>
            <button className="hero-cta" onClick={handleScroll}>
              <span>Explore My Work</span>
              <i className='bx bx-down-arrow-alt'></i>
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="portfolio-scroll-indicator scroll-indicator">
            <span>Scroll</span>
            <i className='bx bx-chevron-down'></i>
          </div>
        </div>

        <img className="featuredimage" src={'/IMG_5225.jpg'} alt="Background" />
      </div>

      <AllProjects />
      <Footer />
    </WebsiteContainer>
  );
}

const PortfolioTitle = () => {
  return (
    <section id="portfolio-title" style={{paddingBottom:'0em'}}>
      <h1>My Portfolio</h1>
      <h4>Showcasing Who I am through research, volunteering, and creative projects</h4>
    </section>
  );
};


const AllProjects = () => {
  return (
    <section>
      <PortfolioTitle />
      <ProjectsGallery />
    </section>
  );
};

const ProjectsGallery = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastProject, setLastProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Add some sample projects for demonstration
  const sampleProjects = [
    {
      id: 'sample-1',
      title: 'Neural Network Optimization',
      description: 'Developed novel optimization algorithms for deep neural networks, achieving 23% faster training times while maintaining accuracy.',
      category: 'research',
      image: '/api/placeholder/400/200',
      website: '#',
      github: '#',
      technologies: ['Python', 'PyTorch', 'CUDA']
    },
    {
      id: 'sample-2',
      title: 'Code for Good Initiative',
      description: 'Led a team of 8 developers to create a resource management system for local food banks, helping distribute 50,000+ meals.',
      category: 'volunteering',
      image: '/api/placeholder/400/200',
      website: '#',
      github: '#',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 'sample-3',
      title: 'Retro Game Collection',
      description: 'Recreated classic arcade games using modern web technologies, featuring pixel-perfect graphics and multiplayer support.',
      category: 'fun',
      image: '/api/placeholder/400/200',
      website: '#',
      github: '#',
      technologies: ['JavaScript', 'Canvas API', 'WebGL']
    }
  ];

  const fetchProjects = async () => {
    try {
      const res = await fetch(`/api/projects?${lastProject ? `startAfter=${lastProject.id}` : ''}&limit=8`);
      const data = await res.json();
      
      // If API fails, use sample projects
      if (!data.projects) {
        setProjects(sampleProjects);
        setFilteredProjects(sampleProjects);
        setHasMore(false);
        return;
      }

      if (data.projects.length < 8) {
        setHasMore(false);
      }
      
      const newProjects = [...projects, ...data.projects];
      setProjects(newProjects);
      setFilteredProjects(newProjects);
      
      if (data.projects.length > 0) {
        setLastProject(data.projects[data.projects.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Fallback to sample projects
      setProjects(sampleProjects);
      setFilteredProjects(sampleProjects);
      setHasMore(false);
    }
  };

  const fetchProjectDetails = async (projectId) => {
    try {
      const res = await fetch(`/api/getProject?id=${projectId}`);
      const data = await res.json();
      setSelectedProject(data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      // Fallback for sample projects
      const project = projects.find(p => p.id === projectId);
      setSelectedProject(project);
    }
  };

  const handleProjectClick = (projectId) => {
    fetchProjectDetails(projectId);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    handleFilterChange(activeFilter);
  }, [projects]);

  const getCategoryClass = (category) => {
    switch(category) {
      case 'research': return 'category-research';
      case 'volunteering': return 'category-volunteering';
      case 'fun': return 'category-fun';
      default: return 'category-research';
    }
  };

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'research': return 'Research';
      case 'volunteering': return 'Volunteering';
      case 'fun': return 'For Fun';
      default: return 'Research';
    }
  };

  return (
    <div className="projects-container">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Projects
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'research' ? 'active' : ''}`}
          onClick={() => handleFilterChange('research')}
        >
          Research
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'volunteering' ? 'active' : ''}`}
          onClick={() => handleFilterChange('volunteering')}
        >
          Volunteering
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'fun' ? 'active' : ''}`}
          onClick={() => handleFilterChange('fun')}
        >
          For Fun
        </button>
      </div>

      {/* Projects Grid */}
      <InfiniteScroll
        dataLength={filteredProjects.length}
        next={fetchProjects}
        hasMore={hasMore && activeFilter === 'all'}
        loader={<h4 style={{ textAlign: 'center' }}>Loading Projects...</h4>}
        endMessage={
          <p style={{ textAlign: 'center', margin: '2rem 0' }}>
            <b>No more projects</b>
          </p>
        }
      >
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id || index} 
              className="project-card" 
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="project-image">
                {project.image && project.image !== '/api/placeholder/400/200' ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-image-placeholder">
                    {project.category === 'research' && '🧠'}
                    {project.category === 'volunteering' && '🤝'}
                    {project.category === 'fun' && '🎮'}
                  </div>
                )}
              </div>
              <div className="project-content" style={{minHeight : 0}}>
                <div className={`project-category ${getCategoryClass(project.category)}`}>
                  {getCategoryLabel(project.category)}
                </div>
                <h3>{project.title}</h3>
                <p>
                  {project.description.length > MAX_DESCRIPTION_LENGTH ? project.description.slice(0, MAX_DESCRIPTION_LENGTH) : project.description}
                  {project.description.length > MAX_DESCRIPTION_LENGTH && '...'}
                  {' '}
                  <Link href={`/portfolio/${project.id}`}>
                    Read More
                  </Link>
                </p>
                {project.technologies && (
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="portfolio-links" style={{ marginTop: '1rem' }}>
                  {project.website && (
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      <i className='bx bx-link-external' style={{ fontSize: '2em', color: '#667eea' }}></i>
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <i className='bx bxl-github' style={{ fontSize: '2em', color: '#667eea' }}></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {/* Modal */}
      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};