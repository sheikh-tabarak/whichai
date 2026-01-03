'use client';
import Loading from '@/app/components/Loading';
import ToolIcon from '@/app/components/ToolIcon';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiExternalLink, FiTag, FiCheck, FiX, FiDollarSign, FiAward, FiCalendar, FiUser, FiChevronRight, FiShare2, FiCopy } from 'react-icons/fi';
import { FaWhatsapp, FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const ToolDetails = ({ slug }) => {
    const [tool, setTool] = useState();
    const [loading, setLoading] = useState(true);
    const [isCopied, setIsCopied] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!slug) return;

        axios.get('/api/aitool/' + slug).then((response) => {
            setTool(response?.data);
            setLoading(false);
        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });
    }, [slug]);

    const handleShare = () => {
        setShowShareModal(true);
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareSocial = (platform) => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(`Check out ${tool.name} on Which AI: `);
        let shareUrl = '';

        switch (platform) {
            case 'whatsapp': shareUrl = `https://wa.me/?text=${text}${url}`; break;
            case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
            case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
            case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        }
        window.open(shareUrl, '_blank', 'width=600,height=400');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <Loading />
        </div>
    );

    if (!tool || tool.error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white space-y-4">
            <h2 className="text-3xl font-bold">Tool not found</h2>
            <button onClick={() => router.push('/')} className="px-6 py-2 bg-blue-600 rounded-lg">Go Home</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
            {/* Background Aesthetic */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-600/5 via-transparent to-transparent"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8 pt-44 lg:pt-48 pb-20 lg:pb-32 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

                    {/* LEFT COLUMN: Tool Intro Sidebar */}
                    <div className="w-full lg:w-[420px] lg:sticky lg:top-40 space-y-6">
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 shadow-2xl overflow-hidden relative group">
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-3xl -z-10 group-hover:bg-blue-600/20 transition-all duration-700"></div>

                            {/* Logo Area */}
                            <div className="relative mb-8">
                                <div className="absolute -inset-6 bg-blue-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                                <div className="relative aspect-square flex items-center justify-center p-8 bg-slate-950/50 border border-white/5 rounded-[32px] overflow-hidden shadow-inner">
                                    <ToolIcon tool={tool} className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>

                            {/* Base Stats */}
                            <div className="space-y-6">

                                <div className="space-y-4">
                                    <Link
                                        href={tool.link || '#'}
                                        target="_blank"
                                        className="w-full flex items-center justify-center gap-3 py-4 lg:py-5 revolution-bg hover:opacity-90 text-white font-black rounded-[20px] transition-all duration-300 shadow-xl shadow-blue-600/20 group text-base lg:text-lg"
                                    >
                                        Visit Website <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </Link>

                                    <button
                                        onClick={handleShare}
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white font-bold rounded-[20px] transition-all duration-300 group text-sm"
                                    >
                                        Share Tool <FiShare2 className="text-slate-400 group-hover:text-white transition-colors" />
                                    </button>

                                    <p className="text-center text-slate-500 text-[10px] uppercase font-black tracking-widest opacity-60">Verified Official Link</p>
                                </div>

                                <div className="pt-6 border-t border-white/5 space-y-4">
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><FiDollarSign className="text-blue-500" /> Pricing</span>
                                        <span className="text-white font-black text-base">{tool.pricing || 'Free'}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-1">
                                        <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"><FiCalendar className="text-purple-500" /> Listed</span>
                                        <span className="text-white font-black text-base">{new Date(tool.dataCreated).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posted By Widget */}
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[28px] p-6 flex items-center gap-4 group hover:bg-white/10 transition-all cursor-default">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-xl">
                                {tool.posted_by?.[0] || 'A'}
                            </div>
                            <div>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Posted by</p>
                                <p className="text-white font-black text-base tracking-tight">{tool.posted_by || 'Admin Portal'}</p>
                            </div>
                            <FiUser className="ml-auto text-slate-600 group-hover:text-blue-400 transition-colors w-5 h-5" />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Imperial Content Card */}
                    <div className="flex-1 space-y-8 w-full">
                        {/* Breadcrumbs & Header */}
                        <div className="space-y-6 lg:space-y-8">
                            <nav className="inline-flex flex-wrap items-center gap-2 px-4 py-2 bg-slate-900/40 border border-white/10 rounded-2xl lg:rounded-full backdrop-blur-xl">
                                <Link href="/" className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Home</Link>
                                <FiChevronRight className="text-slate-700 text-xs" />
                                <Link href="/tools" className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Tools</Link>
                                <FiChevronRight className="text-slate-700 text-xs" />
                                <Link href={'/category/' + (tool.category?.slug || tool.category?._id)} className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                                    {tool.category?.name || 'Uncategorized'}
                                </Link>
                                <FiChevronRight className="text-slate-700 text-xs" />
                                <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-300 italic truncate max-w-[100px] lg:max-w-none">{tool.name}</span>
                            </nav>

                            <div className="space-y-4 lg:space-y-6">
                                <div className="flex items-center gap-4">
                                    {tool.isVerified && (
                                        <div className="flex items-center gap-2 px-3 py-1 lg:px-4 lg:py-1.5 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em]">
                                            <FiAward className="animate-pulse" /> Verified Intelligence
                                        </div>
                                    )}
                                    <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
                                </div>
                                <h1 className="text-3xl lg:text-7xl font-black text-white tracking-tighter leading-tight animate-in fade-in slide-in-from-left duration-1000 break-words">
                                    {tool.name}
                                </h1>
                                <p className="text-base lg:text-lg text-slate-400 leading-relaxed font-medium max-w-4xl selection:bg-blue-500/30">
                                    {tool.description}
                                </p>
                            </div>
                        </div>

                        {/* Main Info Card */}
                        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[32px] lg:rounded-[48px] p-6 lg:p-10 space-y-8 lg:space-y-10 shadow-2xl relative overflow-hidden">
                            {/* Abstract Decor */}
                            <div className="absolute top-20 right-20 w-80 h-80 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>

                            {/* Section: Overview */}
                            <section className="relative space-y-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Intelligence Overview</h2>
                                    <div className="flex-grow h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                                </div>
                                <div className="prose prose-invert max-w-none text-slate-300/90 leading-loose text-base lg:text-lg font-medium">
                                    {tool.longDescription ? (
                                        tool.longDescription.split('\n').map((para, i) => para && <p key={i} className="mb-6">{para}</p>)
                                    ) : (
                                        <p className="italic text-slate-500">
                                            System diagnostic: "{tool.description}" <br /><br />
                                            Deep-dive analysis is currently pending verification. This tool continues to power thousands of creative workflows globally. Stay tuned for further intelligence updates.
                                        </p>
                                    )}
                                </div>
                            </section>

                            {/* Section: Features */}
                            {(tool.features && tool.features.length > 0) && (
                                <section className="space-y-8">
                                    <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">Core Features</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                        {tool.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-4 p-5 lg:p-6 bg-white/5 border border-white/5 rounded-[24px] lg:rounded-[32px] group hover:bg-blue-600/10 hover:border-blue-500/30 transition-all duration-500">
                                                <div className="p-3 bg-blue-600/10 text-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12 shrink-0">
                                                    <FiCheck size={18} />
                                                </div>
                                                <p className="font-bold text-slate-200 mt-1 text-sm lg:text-base">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Section: Pros & Cons */}
                            <section className="grid md:grid-cols-2 gap-6 lg:gap-10 pt-8 lg:pt-12 border-t border-white/5">
                                <div className="bg-white/5 border border-white/5 rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 space-y-6 lg:space-y-8">
                                    <h3 className="text-lg lg:text-xl font-black text-green-400 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shrink-0"><FiCheck /></div>
                                        Operational Pros
                                    </h3>
                                    <ul className="space-y-4">
                                        {(tool.pros && tool.pros.length > 0) ? tool.pros.map((pro, i) => (
                                            <li key={i} className="text-slate-300 font-medium flex items-start gap-4 text-sm lg:text-base">
                                                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500 mt-2 shadow-[0_0_10px_rgba(34,197,94,0.5)] shrink-0"></div> {pro}
                                            </li>
                                        )) : <li className="text-slate-600 italic text-sm">No operational advantages recorded yet.</li>}
                                    </ul>
                                </div>

                                <div className="bg-white/5 border border-white/5 rounded-[32px] lg:rounded-[40px] p-6 lg:p-8 space-y-6 lg:space-y-8">
                                    <h3 className="text-lg lg:text-xl font-black text-red-500 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20 shrink-0"><FiX /></div>
                                        System Limitations
                                    </h3>
                                    <ul className="space-y-4">
                                        {(tool.cons && tool.cons.length > 0) ? tool.cons.map((con, i) => (
                                            <li key={i} className="text-slate-300 font-medium flex items-start gap-4 text-sm lg:text-base">
                                                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-red-500 mt-2 shadow-[0_0_10px_rgba(239,68,68,0.5)] shrink-0"></div> {con}
                                            </li>
                                        )) : <li className="text-slate-600 italic text-sm">No specific system cons reported.</li>}
                                    </ul>
                                </div>
                            </section>

                            {/* Tags Architecture */}
                            <div className="flex flex-wrap gap-2 lg:gap-3 pt-8 lg:pt-12 border-t border-white/5">
                                <div className="w-full mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 flex items-center gap-2">
                                        <FiTag /> Intelligence Tags
                                    </span>
                                </div>
                                {tool.tags?.map((tag, i) => (
                                    <span key={i} className="px-4 py-2 lg:px-6 lg:py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] lg:text-xs font-black text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 cursor-default transition-all duration-500 uppercase tracking-widest">
                                        {tag.toLowerCase().replace(/\s+/g, '')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowShareModal(false)}>
                    <div
                        className="bg-slate-900 border border-white/10 p-6 rounded-3xl w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <FiX size={20} />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-2">Share this tool</h3>
                        <p className="text-slate-400 text-sm mb-6">Spread intelligence with your network.</p>

                        {/* Copy Link Section */}
                        <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-2xl border border-white/5 mb-8">
                            <input
                                readOnly
                                value={typeof window !== 'undefined' ? window.location.href : ''}
                                className="bg-transparent text-slate-400 text-sm flex-grow px-2 focus:outline-none truncate"
                            />
                            <button
                                onClick={copyLink}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${isCopied ? 'bg-green-500/20 text-green-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            >
                                {isCopied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy</>}
                            </button>
                        </div>

                        {/* Social Icons */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { id: 'whatsapp', icon: FaWhatsapp, color: 'text-green-500', bg: 'hover:bg-green-500/10 hover:border-green-500/20' },
                                { id: 'twitter', icon: FaTwitter, color: 'text-blue-400', bg: 'hover:bg-blue-400/10 hover:border-blue-400/20' },
                                { id: 'linkedin', icon: FaLinkedinIn, color: 'text-blue-600', bg: 'hover:bg-blue-600/10 hover:border-blue-600/20' },
                                { id: 'facebook', icon: FaFacebookF, color: 'text-blue-500', bg: 'hover:bg-blue-500/10 hover:border-blue-500/20' }
                            ].map((social) => (
                                <button
                                    key={social.id}
                                    onClick={() => shareSocial(social.id)}
                                    className={`flex items-center justify-center h-14 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 ${social.bg} group`}
                                >
                                    <social.icon size={24} className={`${social.color} group-hover:scale-110 transition-transform`} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToolDetails;
