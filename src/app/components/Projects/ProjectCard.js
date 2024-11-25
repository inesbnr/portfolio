// src/app/components/ProjectCard.js
import React from 'react';

const ProjectCard = ({ title, description, image, isReversed }) => {
  return (
    <div className={`project-card ${isReversed ? 'reversed' : ''}`}>
      <img src={image} alt={`${title} image`} className="project-image" />
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
