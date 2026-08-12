'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiSearch, FiPlus, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='relative z-[100]'>
      <header
        className={`fixed top-4 md:top-6 inset-x-0 mx-auto w-[95%] max-w-screen-2xl flex items-center justify-between py-4 px-4 md:px-8 rounded-[24px] transition-all duration-500 ${isScrolled
          ? 'bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-white/5 backdrop-blur-md border border-white/5'
          }`}
      >
        <Link href={'/'} className="hover:opacity-80 transition-opacity flex items-center gap-3 relative z-[100]">
          <Image
            className="w-[120px] lg:w-[180px] h-auto object-contain"
            src="/logo.svg"
            alt="Which AI Logo"
            width={180}
            height={50}
            priority
          />
          <span className="hidden lg:block text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 tracking-wide">
            v2.0
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className='hidden md:flex items-center gap-8'>
          <ul className='flex items-center gap-6'>
            <Link href={'/'} className='text-slate-400 hover:text-white text-sm font-medium transition-colors'>Home</Link>
            <Link href={'/tools'} className='text-slate-400 hover:text-white text-sm font-medium transition-colors'>Tools</Link>
            <Link href={'/about'} className='text-slate-400 hover:text-white text-sm font-medium transition-colors'>About</Link>
          </ul>

          <div className="h-6 w-[1px] bg-white/10"></div>

          <div className='flex items-center gap-4'>
            <button
              onClick={() => router.push('/search?search=')}
              className='p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all'
              aria-label="Open Search"
            >
              <FiSearch size={20} />
            </button>
            <Link
              href={'/newtool'}
              className='flex items-center gap-2 revolution-bg hover:opacity-90 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95'
            >
              <FiPlus /> Submit Tool
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white relative z-[100]"
          aria-label="Toggle Mobile Menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-slate-950 z-[90] transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-8 pt-32 space-y-8">
          <Link href={'/'} onClick={() => setIsMobileMenuOpen(false)} className='text-3xl font-black text-white hover:text-blue-400 transition-colors'>Home</Link>
          <Link href={'/tools'} onClick={() => setIsMobileMenuOpen(false)} className='text-3xl font-black text-white hover:text-blue-400 transition-colors'>Tools</Link>
          <Link href={'/about'} onClick={() => setIsMobileMenuOpen(false)} className='text-3xl font-black text-white hover:text-blue-400 transition-colors'>About</Link>
          <button
            onClick={() => {
              router.push('/search?search=');
              setIsMobileMenuOpen(false);
            }}
            className='text-3xl font-black text-white hover:text-blue-400 transition-colors text-left flex items-center gap-3'
          >
            <FiSearch /> Search
          </button>
          <Link
            href={'/newtool'}
            onClick={() => setIsMobileMenuOpen(false)}
            className='flex items-center justify-center gap-2 revolution-bg text-white text-xl font-bold py-5 rounded-2xl shadow-xl mt-4'
          >
            <FiPlus /> Submit Tool
          </Link>
        </div>
      </div>

      {/* Scroll Lock */}
      <style jsx global>{`
                body {
                    overflow: ${isMobileMenuOpen ? 'hidden' : 'auto'};
                }
            `}</style>
    </div>
  );
};

export default Header;