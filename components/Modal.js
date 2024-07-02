import Link from 'next/link';
import Image from 'next/image';

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{project.title}</h2>
        <center><img src={project.image} alt={project.title} /></center>
        <p>{project.description}</p>
        {project.description && <p>{project.description}... {<Link href={{pathname: '/portfolio/[id]', query: {id: project.id}}}>{"Read More"}</Link>}</p>}
        <div className="modal-links">
          {project.website && (
            <a href={project.website} target="_blank" rel="noopener noreferrer">
              <button>External Link</button>
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <button>GitHub Repo</button>
            </a>
          )}
          <button className='close-button' onClick={onClose}>Close</button>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
