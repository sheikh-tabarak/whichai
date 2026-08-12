'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  MdSearch, 
  MdHome, 
  MdExplore, 
  MdAddCircleOutline, 
  MdArrowForward,
  MdAutoAwesome
} from 'react-icons/md';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularTags = [
    { label: 'ChatGPT Alternatives', query: 'chatgpt' },
    { label: 'Image Generators', query: 'image' },
    { label: 'Code Assistants', query: 'code' },
    { label: 'Video AI', query: 'video' },
    { label: 'Writing Tools', query: 'writing' }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-40 lg:pt-48 pb-20 overflow-hidden">
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
        
        {/* Animated 404 Hero Badge */}
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 drop-shadow-[0_10px_25px_rgba(168,85,247,0.3)]">
            404
          </div>
          <div className="absolute -top-3 -right-6 sm:-right-8 p-2 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 animate-bounce">
            <MdAutoAwesome className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-bold text-slate-100">
            Lost in the AI Multiverse?
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            The tool or page you are looking for has been moved, renamed, or deleted into hyperspace. Let&apos;s get you back on track!
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 2,500+ AI tools by name, category, tag..."
              className="w-full px-5 py-4 pl-12 pr-28 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm sm:text-base shadow-2xl backdrop-blur-md"
            />
            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-purple-400 transition-colors" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-lg hover:shadow-purple-500/25"
            >
              <span>Search</span>
              <MdArrowForward className="text-sm" />
            </button>
          </form>
        </div>

        {/* Popular Tags */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">
            Popular Searches
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
            {popularTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => router.push(`/search?search=${tag.query}`)}
                className="px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all hover:scale-105"
              >
                #{tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="pt-4 border-t border-slate-800/80 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/"
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-purple-500/40 text-left group transition-all"
          >
            <div className="p-2 w-fit rounded-lg bg-purple-500/10 text-purple-400 mb-2 group-hover:scale-110 transition-transform">
              <MdHome className="text-xl" />
            </div>
            <h2 className="font-semibold text-slate-200 text-sm group-hover:text-purple-300 transition-colors">
              Return Home
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Explore featured AI tools</p>
          </Link>

          <Link
            href="/categories"
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-pink-500/40 text-left group transition-all"
          >
            <div className="p-2 w-fit rounded-lg bg-pink-500/10 text-pink-400 mb-2 group-hover:scale-110 transition-transform">
              <MdExplore className="text-xl" />
            </div>
            <h2 className="font-semibold text-slate-200 text-sm group-hover:text-pink-300 transition-colors">
              All Categories
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Browse tools by category</p>
          </Link>

          <Link
            href="/newtool"
            className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 text-left group transition-all"
          >
            <div className="p-2 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 mb-2 group-hover:scale-110 transition-transform">
              <MdAddCircleOutline className="text-xl" />
            </div>
            <h2 className="font-semibold text-slate-200 text-sm group-hover:text-cyan-300 transition-colors">
              Submit a Tool
            </h2>
            <p className="text-slate-500 text-xs mt-0.5">Add your AI tool to WhichAI</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
