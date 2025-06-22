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
        demo: '',
        image: '',
        category: '',
        date: '',
        location: '',
        technologies: [],
        gallery: [],
        metadata: {}
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const grabProject = async (projectID) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/getProject?id=${projectID}`);
            if (!res.ok) {
                throw new Error('Failed to fetch project');
            }
            const data = await res.json();
            
            // Parse structured content if it exists
            if (data.body && typeof data.body === 'string') {
                try {
                    const parsedBody = JSON.parse(data.body);
                    data.parsedBody = parsedBody;
                } catch {
                    // If parsing fails, treat as plain text
                    data.parsedBody = [{ type: 'paragraph', content: data.body }];
                }
            }
            
            setProject(data);
        } catch (error) {
            console.error('Error fetching project:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            const numId = parseInt(id, 10);
            if (isNaN(numId)) {
                router.push('/portfolio');
            } else {
                grabProject(numId);
            }
        }
    }, [id, router]);

    if (loading) {
        return (
            <WebsiteContainer>
                <NavBar />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading project...</p>
                </div>
                <Footer />
            </WebsiteContainer>
        );
    }

    if (error) {
        return (
            <WebsiteContainer>
                <NavBar />
                <div className="error-container">
                    <h2>Project Not Found</h2>
                    <p>{error}</p>
                    <button onClick={() => router.push('/portfolio')} className="btn btn-primary">
                        Back to Portfolio
                    </button>
                </div>
                <Footer />
            </WebsiteContainer>
        );
    }

    return (
        <WebsiteContainer>
            <Head>
                <title>Ryan Longo - {project.title}</title>
                <meta name="description" content={project.description} />
                <meta property="og:title" content={`Ryan Longo - ${project.title}`} />
                <meta property="og:description" content={project.description} />
                {project.image && <meta property="og:image" content={project.image} />}
                <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
            </Head>
            <NavBar />
            <ProjectArticle project={project} />
            <Footer />
        </WebsiteContainer>
    );
}

const ProjectArticle = ({ project }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    const getCategoryIcon = (category) => {
        switch(category?.toLowerCase()) {
            case 'research': return 'bx-brain';
            case 'volunteering': return 'bx-heart';
            case 'fun': return 'bx-game';
            case 'work': return 'bx-briefcase';
            default: return 'bx-code-alt';
        }
    };

    const getCategoryColor = (category) => {
        switch(category?.toLowerCase()) {
            case 'research': return '#3b82f6';
            case 'volunteering': return '#10b981';
            case 'fun': return '#f56565';
            case 'work': return '#8b5cf6';
            default: return '#667eea';
        }
    };

    const renderContent = (content) => {
        if (!content) return null;
        
        if (Array.isArray(content)) {
            return content.map((block, index) => renderContentBlock(block, index));
        }
        
        // Fallback for plain text
        return <p className="content-paragraph">{content}</p>;
    };

    const renderContentBlock = (block, index) => {
        switch (block.type) {
            case 'paragraph':
                return <p key={index} className="content-paragraph">{block.content}</p>;
            
            case 'heading':
                const HeadingTag = `h${block.level || 3}`;
                return <HeadingTag key={index} className="content-heading">{block.content}</HeadingTag>;
            
            case 'image':
                return (
                    <div key={index} className="content-image-container">
                        <img 
                            src={block.src} 
                            alt={block.alt || ''} 
                            className="content-image"
                            onClick={() => setSelectedImage({ src: block.src, alt: block.alt, caption: block.caption })}
                        />
                        {block.caption && <p className="image-caption">{block.caption}</p>}
                    </div>
                );
            
            case 'embed':
                return (
                    <div key={index} className="content-embed">
                        <iframe 
                            src={block.src}
                            title={block.title || 'Embedded content'}
                            className="embed-iframe"
                            allowFullScreen
                        ></iframe>
                        {block.caption && <p className="embed-caption">{block.caption}</p>}
                    </div>
                );
            
            case 'table':
                return (
                    <div key={index} className="content-table-container">
                        <table className="content-table">
                            {block.headers && (
                                <thead>
                                    <tr>
                                        {block.headers.map((header, i) => (
                                            <th key={i}>{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                            )}
                            <tbody>
                                {block.rows.map((row, i) => (
                                    <tr key={i}>
                                        {row.map((cell, j) => (
                                            <td key={j}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {block.caption && <p className="table-caption">{block.caption}</p>}
                    </div>
                );
            
            case 'dropdown':
                return (
                    <div key={index} className="content-dropdown">
                        <button 
                            className="dropdown-toggle"
                            onClick={() => toggleSection(`dropdown-${index}`)}
                        >
                            <span>{block.title}</span>
                            <i className={`bx ${expandedSections[`dropdown-${index}`] ? 'bx-chevron-up' : 'bx-chevron-down'}`}></i>
                        </button>
                        {expandedSections[`dropdown-${index}`] && (
                            <div className="dropdown-content">
                                {renderContent(block.content)}
                            </div>
                        )}
                    </div>
                );
            
            case 'list':
                const ListTag = block.ordered ? 'ol' : 'ul';
                return (
                    <ListTag key={index} className="content-list">
                        {block.items.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ListTag>
                );
            
            case 'code':
                return (
                    <div key={index} className="content-code-container">
                        <pre className="content-code">
                            <code className={`language-${block.language || 'text'}`}>
                                {block.content}
                            </code>
                        </pre>
                        {block.caption && <p className="code-caption">{block.caption}</p>}
                    </div>
                );
            
            default:
                return <p key={index} className="content-paragraph">{block.content || JSON.stringify(block)}</p>;
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section className="project-hero">
                <div className="project-hero-image">
                    {project.image ? (
                        <img src={project.image} alt={project.title} />
                    ) : (
                        <div className="project-hero-placeholder">
                            <i className={`bx ${getCategoryIcon(project.category)}`}></i>
                        </div>
                    )}
                    <div className="project-hero-overlay">
                        <div className="project-hero-content">
                            <div className="project-meta">
                                {project.category && (
                                    <span 
                                        className="project-category-badge"
                                        style={{ backgroundColor: getCategoryColor(project.category) }}
                                    >
                                        <i className={`bx ${getCategoryIcon(project.category)}`}></i>
                                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                                    </span>
                                )}
                                {(project.date || project.location) && (
                                    <div className="project-date-location">
                                        {project.date && (
                                            <span className="project-date">
                                                <i className='bx bx-calendar'></i>
                                                {formatDate(project.date)}
                                            </span>
                                        )}
                                        {project.location && (
                                            <span className="project-location">
                                                <i className='bx bx-map'></i>
                                                {project.location}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                            <h1 className="project-hero-title">{project.title}</h1>
                            <p className="project-hero-description">{project.description}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-action-btn demo-btn">
                            <i className='bx bx-play-circle'></i>
                            Live Demo
                        </a>
                    )}
                    {project.website && (
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="project-action-btn website-btn">
                            <i className='bx bx-link-external'></i>
                            Visit Website
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action-btn github-btn">
                            <i className='bx bxl-github'></i>
                            View Code
                        </a>
                    )}
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="project-technologies">
                        <h3>Technologies Used</h3>
                        <div className="tech-tags">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="tech-tag">{tech}</span>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Main Content */}
            <section className="project-content">
                <div className="project-content-container">
                    {project.parsedBody ? renderContent(project.parsedBody) : renderContent(project.body)}
                </div>
            </section>

            {/* Image Gallery */}
            {project.gallery && project.gallery.length > 0 && (
                <section className="project-gallery">
                    <div className="project-content-container">
                        <h2>Project Gallery</h2>
                        <div className="gallery-grid">
                            {project.gallery.map((image, index) => (
                                <div key={index} className="gallery-item">
                                    <img 
                                        src={image.src} 
                                        alt={image.alt || `Gallery image ${index + 1}`}
                                        onClick={() => setSelectedImage(image)}
                                    />
                                    {image.caption && <p className="gallery-caption">{image.caption}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div className="image-modal" onClick={() => setSelectedImage(null)}>
                    <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
                            <i className='bx bx-x'></i>
                        </button>
                        <img src={selectedImage.src} alt={selectedImage.alt} />
                        {selectedImage.caption && <p className="modal-caption">{selectedImage.caption}</p>}
                    </div>
                </div>
            )}
        </>
    );
};