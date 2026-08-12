import React from 'react'
import { FiTarget, FiUsers, FiGlobe, FiZap } from 'react-icons/fi'
import Link from 'next/link'

export const metadata = {
    title: 'About - Which AI',
    description: 'Discover the vision behind Which AI - the world\'s most comprehensive directory for artificial intelligence tools.'
}

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pt-44 lg:pt-48 pb-12 lg:pb-20 overflow-hidden relative">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>

            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8 max-w-5xl">
                <div className="space-y-10 lg:space-y-16">
                    {/* Hero Section */}
                    <div className="text-center space-y-4 lg:space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-xs lg:text-sm font-bold uppercase tracking-widest">
                            <FiZap /> Our Mission
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight">
                            Democratizing the <br className="hidden md:block" />
                            <span className="revolution-text">AI Revolution</span>
                        </h1>
                        <p className="text-base lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
                            Which AI was born out of a simple observation: the AI landscape is evolving faster than human attention can keep up. We curate the chaos into a structured, powerful directory.
                        </p>
                    </div>

                    {/* Stats/Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            { icon: <FiGlobe />, title: "2,500+", desc: "Curated AI tools across 50+ specialized categories." },
                            { icon: <FiUsers />, title: "Community Driven", desc: "Built by developers, for researchers and creators." },
                            { icon: <FiTarget />, title: "Precision Search", desc: "Find the exact tool for your unique workflow." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 lg:p-8 glass-card rounded-[24px] lg:rounded-[32px] space-y-3 lg:space-y-4 hover:border-blue-500/30 transition-all group">
                                <div className="text-blue-400 group-hover:scale-110 transition-transform text-2xl lg:text-3xl">{item.icon}</div>
                                <h3 className="text-xl lg:text-2xl font-bold text-white">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm lg:text-base">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Narrative Section */}
                    <div className="space-y-8 lg:space-y-12">
                        <div className="p-6 lg:p-12 glass-card rounded-[32px] lg:rounded-[40px] border-l-4 border-l-blue-600 space-y-4 lg:space-y-6">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white">Why Which AI?</h2>
                            <div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-slate-400 leading-relaxed">
                                <p>
                                    In the modern era, "AI" has become a buzzword. But beneath the hype lie genuine tools that can save you hours of work, solve complex problems, and unlock new creative dimensions.
                                </p>
                                <p>
                                    Our mission is to simplify this discovery process. We don't just list tools; we categorize them, verify their utility, and provide a platform for the community to contribute to the ever-evolving AI ecosystem.
                                </p>
                            </div>
                        </div>

                        <div className="text-center space-y-6 lg:space-y-8">
                            <h2 className="text-2xl lg:text-3xl font-bold text-white">Ready to contribute?</h2>
                            <p className="text-slate-400 text-base lg:text-lg px-4">
                                If you've built something amazing or found a tool we missed, we want to hear from you.
                            </p>
                            <Link
                                href="/newtool"
                                className="inline-block px-8 py-4 lg:px-12 lg:py-5 bg-white text-slate-950 font-black text-base lg:text-lg rounded-2xl hover:scale-105 transition-all shadow-xl"
                            >
                                Submit to Directory
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage