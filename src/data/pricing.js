
import { Laptop, Layers, Rocket } from 'lucide-react';

export const plans = [
  {
    name: 'Launch',
    originalPrice: 2500,
    startingPrice: 1999,
    icon: Laptop,
    description: 'A great start for individuals and small needs.',
    features: [
      'Single-page or small website',
      'Responsive design (mobile-friendly)',
      'Modern & clean UI',
      'Essential contact information',
    ],
    action: 'Get a Quote',
  },
  {
    name: 'Elevate',
    originalPrice: 9999,
    startingPrice: 7999,
    icon: Layers,
    description: 'Perfect for businesses, brands and growing projects.',
    features: [
      'Multi-page website',
      'Custom design & layout',
      'Responsive on all devices',
      'SEO-friendly structure',
      'Contact / enquiry integration',
    ],
    action: 'Get a Quote',
    featured: true,
  },
  {
    name: 'Signature',
    originalPrice: 15999,
    startingPrice: 12999,
    icon: Rocket,
    description: 'Tailored solutions for unique and advanced needs.',
    features: [
      'Fully customized website',
      'Tailored features & integrations',
      'Performance optimized',
      'Scalable & future-ready',
      'Priority support',
    ],
    action: 'Discuss Your Idea',
  },
];
