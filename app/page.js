import React from 'react'
import HomePage from './components/HomePage';

export const metadata = {
  title: 'Which AI | The Ultimate AI Tools Directory & Empire',
  description: 'Unlock AI\'s potential with over 2500+ curated tools. The #1 destination for finding the best Artificial Intelligence software for productivity, coding, design, and more. Updated daily.',
  keywords: [
    'AI Tools Directory', 'Best AI Software', 'Generative AI',
    'ChatGPT Alternatives', 'Midjourney Prompts', 'AI Writing Tools',
    'AI Image Generators', 'Productivity AI', 'Coding Assistants',
    'Marketing AI', 'SEO Tools', 'Video Generation AI'
  ],
  openGraph: {
    title: 'Which AI | Discover the Future of Intelligence',
    description: 'The world\'s most comprehensive and verified AI tools directory. Find exactly what you need to revolutionize your workflow.',
    url: '/',
    images: ['/api/og?title=Which%20AI&subtitle=The%20Ultimate%20AI%20Directory&type=Empire'],
  },
  alternates: {
    canonical: '/',
  }
};

export default function Home() {
  return (
    <HomePage />
  )
}
