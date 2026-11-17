import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/playfair-display/wght-italic.css';
import './global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);
