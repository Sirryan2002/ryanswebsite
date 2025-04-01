import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WebsiteContainer from '@/components/Container';

export default function Project() {
    const router = useRouter();
    const { id } = router.query;

    const [project, setProject] = useState({
        title: '',
        description: '',
        body: '',
        website: '',
        github: '',
        image: '',
        category: ''
    });

    const grabProject = async (projectID) => {
        try {
            const res = await fetch(`/api/getProject?id=${projectID}`);
            if (!res.ok) {
                throw new Error('Failed to fetch project');
            }
            const data = await res.json();
            setProject(data);
        } catch (error) {
            console.error('Error fetching project:', error);
            router.push('/portfolio'); // Redirect to portfolio page on error
        }
    }

    useEffect(() => {
        if (id) {
            const numId = parseInt(id, 10);
            if (isNaN(numId)) {
                router.push('/portfolio'); // Redirect if id is not a number
            } else {
                grabProject(numId);
            }
        }
    }, [id, router]);

    if (!id) {
        return <div>Loading...</div>; // Or any loading state you prefer
    }

    return (
        <WebsiteContainer>
            <Head>
                <title>Ryan Longo - {project.title}</title>
            </Head>
            <NavBar />
            <ProjectArticle project={project} />
            <Footer />
        </WebsiteContainer>
    );
}

const ProjectArticle = ({ project }) => {
    return (
      <section className="project-article">
        <div className='article-wrapper'>
            <div className="project-header">
            <h1>{project.title}</h1>
            </div>
            
            <div className="project-image">
                <img src={project.image} alt={project.title} />
            </div>
            
            <div className="project-body">
                <div dangerouslySetInnerHTML={{ __html: project.body }} />
            </div>
            
            <div className="project-links">
            {project.website && (
                <a href={project.website} target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Website
                </a>
            )}
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub
                </a>
            )}
            </div>
        </div>
      </section>
    );
  }