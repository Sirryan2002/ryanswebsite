import { useState, useEffect } from 'react';

const Modal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{project.title}</h2>
        <img src={project.image} alt={project.title} />
        <p>{project.description}</p>
        {project.description && <p>{project.description}</p>}
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
