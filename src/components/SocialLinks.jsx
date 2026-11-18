
import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import './SocialLinks.css';

const platforms = [
  {
    name: 'Instagram',
    Icon: Instagram,
    url: import.meta.env.VITE_INSTAGRAM_URL,
  },
  {
    name: 'LinkedIn',
    Icon: Linkedin,
    url: import.meta.env.VITE_LINKEDIN_URL,
  },
];

export default function SocialLinks() {
  return (
    <div className="social-links">
      {platforms.map(({ name, Icon, url }) => (
        <a
          key={name}
          href={url?.trim() || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name}`}
          onClick={() => {
            console.log(`${name} clicked`);
            console.log('URL:', url);
          }}
        >
          <Icon size={20} aria-hidden="true" />
        </a>
      ))}
    </div>
    
  );
  
}
