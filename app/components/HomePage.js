'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ToolCard from "./ToolCard";
import { CategorySkeleton, ToolSkeleton } from "./Skeleton";
import {
    FiSearch, FiZap, FiTrendingUp, FiCpu, FiMessageSquare,
    FiVideo, FiActivity, FiPieChart, FiMic, FiTarget,
    FiEdit3, FiPaperclip, FiShield, FiHeart, FiDollarSign,
    FiBookOpen, FiPlay, FiBarChart2, FiSmile, FiHome, FiBox
} from "react-icons/fi";
import Loading from "./Loading";
import { MdSearchOff } from 'react-icons/md';

const CATEGORY_ICONS = {
    "Chat Bots": <FiMessageSquare />,
    "Video and Image Editing": <FiVideo />,
    "Natural Language Processing (NLP)": <FiCpu />,
    "Machine Learning": <FiActivity />,
    "Data Analysis and Predictive Analytics": <FiPieChart />,
    "Voice and Speech Recognition": <FiMic />,
    "Recommendation Systems": <FiTarget />,
    "Content Creation and Text Generation": <FiEdit3 />,
    "Virtual Assistants and Automation": <FiPaperclip />,
    "Cybersecurity and Fraud Detection": <FiShield />,
    "Healthcare AI": <FiHeart />,
    "Finance AI": <FiDollarSign />,
    "Education AI": <FiBookOpen />,
    "Gaming AI": <FiPlay />,
    "Marketing and Personalization": <FiBarChart2 />,
    "Sentiment Analysis": <FiSmile />,
    "Smart Home and IoT AI": <FiHome />,
    "Augmented Reality (AR) and Virtual Reality (VR)": <FiBox />
};

export default function HomePage() {
    const router = useRouter();

    const [RecentCategories, setRecentCategories] = useState([])
    const [SearchText, setSearchText] = useState('')
    const [filtredTools, setfilteredTools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [categoriesRes, toolsRes] = await Promise.allSettled([
                    axios.get('/api/categories'),
                    axios.get('/api/aitool', { params: { limit: 12 } })
                ]);

                if (categoriesRes.status === 'fulfilled' && categoriesRes.value.data) {
                    setRecentCategories(categoriesRes.value.data);
                }

                if (toolsRes.status === 'fulfilled' && toolsRes.value.data) {
                    setfilteredTools(toolsRes.value.data.tools);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        router.push('/search?search=' + SearchText)
    }

    const popularCategories = RecentCategories.map(cat => ({
        name: cat.name,
        icon: CATEGORY_ICONS[cat.name] || <FiBox />,
        slug: cat.slug || cat._id
    }));

    // If no categories fetched yet, use placeholder list to avoid empty UI
    const firstRow = popularCategories.length > 0 ? popularCategories.slice(0, Math.ceil(popularCategories.length / 2)) : [];
    const secondRow = popularCategories.length > 0 ? popularCategories.slice(Math.ceil(popularCategories.length / 2)) : [];

    return (
        <div className="relative min-h-screen overflow-hidden group/hero">
            {/* Spotlight Effect */}
            <div className="pointer-events-none absolute -inset-px opacity-0 group-hover/hero:opacity-100 transition duration-300 z-30"
                style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(37, 99, 235, 0.06), transparent 80%)',
                }}
            />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10" style={{ animationDelay: '1s' }}></div>

            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8 pt-44 lg:pt-48 pb-20"
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
            >
                {/* Hero Section */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-40 bg-blue-600/5 blur-[100px] -z-10 rounded-full"></div>
                <div className="flex flex-col items-center text-center space-y-6 md:space-y-8 mb-12 lg:mb-24 relative z-40">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] py-0.5 px-1">Curated Intelligence</span>
                    </div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                            Find the Perfect <br />
                            <span className="animate-shine-gradient drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">AI Tool</span> for You
                        </h1>
                    </div>

                    <p className="text-slate-400 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed font-medium px-4">
                        Navigate the AI landscape with <span className="revolution-text font-bold">Which AI</span>. <br className="hidden md:block" />
                        Discover <span className="text-white">2,500+</span> curated tools to power your workflow.
                    </p>

                    {/* Search Bar */}
                    <div className="w-full max-w-3xl relative mt-8 group px-2">
                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <form onSubmit={handleSearch} className="relative flex items-center bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-3xl">
                            <div className="pl-4 md:pl-6 text-blue-500">
                                <FiSearch size={24} className="md:w-7 md:h-7" />
                            </div>
                            <input
                                value={SearchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="flex-grow bg-transparent p-5 md:p-7 text-white text-lg md:text-xl focus:outline-none placeholder:text-slate-600 w-full"
                                type="text"
                                placeholder="What problem are you solving?"
                            />
                            <button
                                type="submit"
                                className="mr-2 md:mr-3 revolution-bg hover:opacity-90 text-white font-black py-3 px-6 md:py-4 md:px-10 rounded-xl transition-all duration-300 shadow-xl text-sm md:text-base"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                {/* Interactive Category Marquee */}
                <div className="space-y-12 mb-20 lg:mb-32 -mx-6 overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-6 px-12 overflow-hidden">
                                {[1, 2, 3, 4, 5, 6].map((i) => <CategorySkeleton key={i} />)}
                            </div>
                            <div className="flex gap-6 px-12 overflow-hidden">
                                {[1, 2, 3, 4, 5, 6].map((i) => <CategorySkeleton key={i} />)}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            {/* Row 1: Left Scroll */}
                            <div className="relative flex overflow-hidden">
                                <div className="flex whitespace-nowrap animate-scroll-left hover:[animation-play-state:paused] gap-6 px-12">
                                    {[...firstRow, ...firstRow].map((cat, i) => (
                                        <button
                                            key={i}
                                            onClick={() => router.push(`/category/${cat.slug}`)}
                                            className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-300 transition-all duration-500 hover:border-blue-500/50 hover:text-white hover:scale-105 group"
                                        >
                                            <span className="text-blue-400 group-hover:scale-125 transition-transform">{CATEGORY_ICONS[cat.name] || <FiBox />}</span>
                                            <span className="font-bold tracking-tight text-sm md:text-base">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Row 2: Right Scroll */}
                            <div className="relative flex overflow-hidden">
                                <div className="flex whitespace-nowrap animate-scroll-right hover:[animation-play-state:paused] gap-6 px-12">
                                    {[...secondRow, ...secondRow].map((cat, i) => (
                                        <button
                                            key={i}
                                            onClick={() => router.push(`/category/${cat.slug}`)}
                                            className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-300 transition-all duration-500 hover:border-purple-500/50 hover:text-white hover:scale-105 group"
                                        >
                                            <span className="text-purple-400 group-hover:scale-125 transition-transform">{CATEGORY_ICONS[cat.name] || <FiBox />}</span>
                                            <span className="font-bold tracking-tight text-sm md:text-base">{cat.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Popular AI Tools section */}
                <div className="space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-400 font-black text-sm uppercase tracking-[0.2em]">
                                <FiTrendingUp />
                                <span>Featured Ecosystem</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter">Popular AI Solutions</h2>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button
                                onClick={() => router.push('/tools')}
                                className="w-full md:w-auto justify-center px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2 group"
                            >
                                View All Tools
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ToolSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filtredTools?.length > 0 ? filtredTools.slice(0, 12).map((tool, key) => (
                                <ToolCard key={key} tool={tool} />
                            )) : (
                                <div className="col-span-full py-32 flex flex-col items-center space-y-6 text-center">
                                    <div className="p-10 bg-slate-900 border border-white/5 rounded-full text-slate-700 shadow-inner">
                                        <MdSearchOff size={80} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-bold text-white">No tool found</h3>
                                        <p className="text-slate-500 text-lg">Our scouts are looking for new breakthroughs. Try another search.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* SEO Content Section */}
                <div className="mt-40 lg:mt-80 relative">
                    {/* Background Decorative Glows */}
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10"></div>

                    <div className="space-y-20 lg:space-y-48">
                        <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="space-y-8 lg:space-y-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Empire Intelligence</span>
                                </div>
                                <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[1.15]">
                                    The Ultimate <br />
                                    <span className="animate-shine-gradient">AI Directory</span>
                                </h2>
                                <p className="text-slate-400 text-lg lg:text-xl leading-relaxed font-medium">
                                    Which AI is a curated ecosystem designed to help you navigate the next generation of digital transformation. We analyze thousands of models to deliver only the most efficient solutions.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                    <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white/10 transition-all duration-500">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all">
                                            <FiShield size={24} />
                                        </div>
                                        <h3 className="text-white font-black text-lg mb-2 leading-none">Expert Curation</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Every intelligence tool is verified by specialists for peak performance.</p>
                                    </div>
                                    <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] group hover:bg-white/10 transition-all duration-500">
                                        <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all">
                                            <FiActivity size={24} />
                                        </div>
                                        <h3 className="text-white font-black text-lg mb-2 leading-none">Real-time Logs</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Our neural database synchronizes daily with global AI breakthroughs.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group lg:mt-0 mt-8">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[48px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                                <div className="relative bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-[48px] p-8 lg:p-12 space-y-10 shadow-2xl">
                                    <h3 className="text-3xl font-black text-white tracking-tight leading-none">System Advantages</h3>
                                    <div className="space-y-8">
                                        {[
                                            { icon: <FiZap className="text-yellow-400" />, title: "Rapid Discovery", desc: "Locate mission-critical tools in milliseconds, not hours." },
                                            { icon: <FiDollarSign className="text-green-400" />, title: "Budget Optimization", desc: "Access verified free and freemium intelligence models." },
                                            { icon: <FiTrendingUp className="text-blue-400" />, title: "Exponential Growth", desc: "Automate workflows with state-of-the-art machine learning." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-6 items-start">
                                                <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner group-hover:bg-white/10 transition-all">
                                                    {item.icon}
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-white font-black text-sm uppercase tracking-widest leading-none">{item.title}</h4>
                                                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section className="max-w-4xl mx-auto space-y-16 lg:space-y-24 relative z-10 pt-10 lg:pt-20">
                            <div className="text-center space-y-6 lg:space-y-10">
                                <div className="flex justify-center">
                                    <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 shadow-xl">Knowledge Base</div>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-white tracking-tighter leading-[1.15]">Frequently Asked <span className="text-blue-500">Intelligence</span></h2>
                            </div>
                            <div className="grid gap-6">
                                {[
                                    { q: "How are tools selected for Which AI?", a: "We prioritize tools that offer unique capabilities, stable performance, and clear value propositions. Our team manually reviews submissions to maintain the highest standard of quality." },
                                    { q: "Are the AI tools on this site free?", a: "The directory includes a wide range of pricing models, from completely free open-source tools to premium enterprise solutions. You can use our 'Pricing' filter to find exactly what fits your budget." },
                                    { q: "How can I submit my own AI project?", a: "Simply initiate a project upload via the 'Submit Tool' portal. Our system analysts review all submissions within 24-48 hours to ensure ecosystem compatibility." }
                                ].map((item, i) => (
                                    <div key={i} className="group relative">
                                        <div className="absolute inset-0 bg-blue-600/5 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                                        <div className="relative p-6 lg:p-10 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] hover:border-blue-500/30 transition-all duration-500">
                                            <h4 className="text-white font-black text-lg lg:text-xl mb-4 flex items-center gap-4 group-hover:text-blue-400 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                                                {item.q}
                                            </h4>
                                            <p className="text-slate-400 leading-loose font-medium text-sm lg:text-base">{item.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>


                {/* Footer Style CTA */}
                <div className="mt-20 lg:mt-40 p-8 lg:p-16 bg-gradient-to-br from-blue-600/10 via-slate-900/50 to-purple-600/10 border border-white/10 rounded-[40px] lg:rounded-[60px] text-center space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.01] -z-10"></div>
                    <div className="inline-flex p-4 bg-blue-600/10 rounded-3xl text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <FiCpu size={32} className="lg:w-12 lg:h-12" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl lg:text-6xl font-black text-white tracking-tighter underline lg:no-underline decoration-blue-600">Have an AI Tool?</h2>
                        <p className="text-slate-400 text-base lg:text-xl max-w-2xl mx-auto">
                            Expose your creation to thousands of early adopters and industry leaders.
                        </p>
                    </div>
                    <button
                        onClick={() => router.push('/newtool')}
                        className="bg-white text-slate-950 font-black px-10 py-4 lg:px-12 lg:py-5 rounded-2xl hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
                    >
                        Submit Project
                    </button>
                </div>
            </div>
        </div>
    );
}
