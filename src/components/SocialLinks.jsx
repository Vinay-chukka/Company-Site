import React from 'react';
import { Instagram, Linkedin, Youtube, Dribbble } from 'lucide-react';
import './SocialLinks.css';

const platforms = [
  ['Instagram', Instagram, import.meta.env.VITE_INSTAGRAM_URL],
  ['LinkedIn', Linkedin, import.meta.env.VITE_LINKEDIN_URL],
  ['YouTube', Youtube, import.meta.env.VITE_YOUTUBE_URL],
  ['Dribbble', Dribbble, import.meta.env.VITE_DRIBBBLE_URL],
];

export default function SocialLinks() {
  return (
    <div className="social-links">
      {platforms.map(([label, Icon, url]) => url
        ? <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}><Icon /></a>
        : <span key={label} title={label + ' profile coming soon'} aria-label={label + ' unavailable'} role="img"><Icon /></span>)}
    </div>
  );
}
