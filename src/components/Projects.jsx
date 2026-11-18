import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { art } from '../data/site.js';
import { projects } from '../data/projects.js';
import DetailDialog from './DetailDialog.jsx';
import './Projects.css';

function projectHref(slug) {
  return import.meta.env.BASE_URL + 'projects/' + slug + '/';
}

export default function Projects() {
  const [showIndex, setShowIndex] = useState(false);

  return (
    <section id="projects" className="projects wrap">
      <p className="eyebrow">Selected Projects</p>
      <h2 className="section-title">Work We’re <em>Proud Of.</em></h2>
      <div className="project-grid">
        {projects.map((project) => (
          <a className="project-card" key={project.slug} href={projectHref(project.slug)}>
            <img src={art(project.image)} alt="" width="664" height="275" loading="lazy" />
            <span className="project-caption">
              <span><strong>{project.name}</strong><span className="project-category">Concept • {project.category}</span></span>
              <span className="project-arrow"><ArrowUpRight aria-hidden="true" /></span>
            </span>
          </a>
        ))}
      </div>
      {/* <button type="button" className="text-link all-projects" onClick={() => setShowIndex(true)}>View All Projects <ArrowUpRight /></button> */}
      {showIndex && <DetailDialog title="All Projects" onClose={() => setShowIndex(false)}>
        <ul className="project-index">{projects.map((project) => <li key={project.slug}>
          <a className="text-link" href={projectHref(project.slug)}>{project.name} <ArrowUpRight aria-hidden="true" /></a>
        </li>)}</ul>
      </DetailDialog>}
    </section>
  );
}
