import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './ProjectDetail.css';

export default function ProjectDetail({ project }) {
  return (
    <main className="wrap detail-project">
      <a className="button button--outline detail-back" href="../../#projects"><ArrowLeft aria-hidden="true" /> Back to Projects</a>
      <p className="eyebrow">Concept · {project.category}</p>
      <h1 className="section-title">{project.name}</h1>
      <p className="detail-summary">{project.description}</p>
      <div className="detail-layout">
        <figure className="detail-preview">
          <img src={'../../art/' + project.image + '.webp'} width="664" height="275" alt={project.alt} />
          {/* <figcaption>{project.name} design preview</figcaption> */}
        </figure>
        <section className="detail-features" aria-labelledby="project-details">
          <h2 id="project-details">Project Details</h2>
          <dl>
            {project.features.map(([name, description]) => (
              <div key={name}><dt>{name}</dt><dd>{description}</dd></div>
            ))}
          </dl>
          {project.projectLink && (
            <a
              className="button button--solid"
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
