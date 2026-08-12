'use client';
import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import React, { useState } from 'react'
import Image from 'next/image'
import { FiChevronDown } from 'react-icons/fi'

const FooterMenu = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="space-y-4 md:space-y-6 w-full border-b md:border-none border-white/5 md:pb-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full md:w-auto md:cursor-default group py-4 md:py-0"
            >
                <h4 className="text-white font-bold uppercase tracking-widest text-sm">{title}</h4>
                <FiChevronDown className={`md:hidden text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
                {children}
            </div>
        </div>
    )
}

const Footer = () => {
    return (
        <footer className='relative bg-slate-900/40 backdrop-blur-3xl border-t border-white/5 pt-10 md:pt-20 pb-10 overflow-hidden'>
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 mb-10 md:mb-16 text-center md:text-left">
                    <div className="col-span-1 md:col-span-2 space-y-6 flex flex-col items-center md:items-start mb-8 md:mb-0">
                        <Link href={'/'}>
                            <Image
                                className="opacity-90 w-[140px] md:w-[180px]"
                                src="/logo.svg"
                                alt="Which AI Logo"
                                width={180}
                                height={50}
                                priority
                            />
                        </Link>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-sm mx-auto md:mx-0">
                            Curating the world's most innovative AI tools to amplify your productivity and creative intelligence.
                        </p>
                        <div className='flex gap-4 md:gap-5 justify-center md:justify-start'>
                            {[
                                { icon: <FaGithub />, href: 'https://github.com/sheikh-tabarak/whichai', label: "GitHub Profile" },
                                { icon: <FaLinkedin />, href: 'https://linkedin.com/in/sheikhtabarak', label: "LinkedIn Profile" },
                                { icon: <FaInstagram />, href: 'https://instagram.com/sheikhtabarak.me', label: "Instagram Profile" }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    target='_blank'
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <FooterMenu title="Direct Links">
                        <ul className="space-y-3 pb-4 md:pb-0 md:space-y-4">
                            <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors block py-1 md:py-0">Home</Link></li>
                            <li><Link href="/tools" className="text-slate-400 hover:text-blue-400 transition-colors block py-1 md:py-0">Tools Empire</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-blue-400 transition-colors block py-1 md:py-0">About Directory</Link></li>
                            <li><Link href="/newtool" className="text-slate-400 hover:text-blue-400 transition-colors block py-1 md:py-0">Submit a Tool</Link></li>
                        </ul>
                    </FooterMenu>

                    <FooterMenu title="Community">
                        <ul className="space-y-3 pb-4 md:pb-0 md:space-y-4">
                            <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors block py-1 md:py-0">Newsletter</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors block py-1 md:py-0">API Docs</Link></li>
                        </ul>
                    </FooterMenu>
                </div>

                <div className='pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6'>
                    <div className='flex flex-col md:flex-row items-center gap-2 text-slate-500 text-sm'>
                        <span>A project crafted with passion by</span>
                        <Link href={'https://sheikhtabarak.me'} target='_blank' className='hover:opacity-80 transition-opacity'>
                            <img src="/sheikhtabarak-logo.svg" alt="Sheikh Tabarak" className="h-6 md:h-7" />
                        </Link>
                        <span>author of</span>
                        <Link href={'https://tools.sheikhtabarak.me'} target='_blank' className='hover:opacity-80 transition-opacity'>
                            <img src="/tools-logo.webp" alt="SMT Tools" className="h-8" />
                        </Link>
                    </div>

                    <div className='flex items-center gap-4'>
                        <span className='px-3 py-1 rounded-lg bg-green-900/20 border border-green-500/20 text-green-500 text-xs font-mono'>v2.0.0</span>
                        <span className='text-slate-500 text-xs font-bold uppercase tracking-widest'>© 2026 Which AI</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;