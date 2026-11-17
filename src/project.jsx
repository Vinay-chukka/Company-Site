import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/playfair-display/wght-italic.css';
import './global.css';
import { projects } from './data/projects.js';
import ProjectDetail from './pages/ProjectDetail.jsx';

const root = document.getElementById('root');
const project = projects.find(({ slug }) => slug === root.dataset.project);
createRoot(root).render(<ProjectDetail project={project} />);
