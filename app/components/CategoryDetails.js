'use client';
import ToolCard from '@/app/components/ToolCard';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FiGrid, FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { ToolSkeleton } from "./Skeleton";

const CategoryDetails = ({ slug }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState();
    const [tools, setTools] = useState([]);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [categoryRes, toolsRes] = await Promise.all([
                    axios.get('/api/categories/' + slug),
                    axios.get('/api/aitool/category/' + slug)
                ]);

                setCategory(categoryRes.data);
                setTools(toolsRes.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8 pt-44 lg:pt-48">
                {loading ? (
                    <div className="space-y-12">
                        <div className="h-[250px] bg-white/5 animate-pulse border border-white/10 rounded-[40px] flex items-center px-10 gap-8">
                            <div className="w-32 h-32 bg-white/5 rounded-3xl shrink-0"></div>
                            <div className="space-y-4 flex-grow">
                                <div className="w-24 h-6 bg-white/5 rounded-full"></div>
                                <div className="w-1/2 h-12 bg-white/5 rounded-xl"></div>
                                <div className="w-2/3 h-6 bg-white/5 rounded-lg"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ToolSkeleton key={i} />)}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header Section */}
                        <div className="mb-12 lg:mb-16 space-y-6 lg:space-y-8">
                            <nav className="inline-flex flex-wrap items-center gap-2 px-4 py-2 lg:px-6 bg-slate-900/40 border border-white/10 rounded-2xl lg:rounded-full backdrop-blur-xl mb-4">
                                <Link href="/" className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Home</Link>
                                <FiChevronRight className="text-slate-700 text-xs" />
                                <Link href="/tools" className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Tools</Link>
                                <FiChevronRight className="text-slate-700 text-xs" />
                                <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-300 italic">{category?.name}</span>
                            </nav>

                            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 items-center md:items-start p-6 lg:p-10 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[32px] lg:rounded-[40px] backdrop-blur-xl">
                                <div className="shrink-0">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-2xl"></div>
                                        <img
                                            src={category?.icon || 'https://placehold.co/100x100/1e293b/475569?text=Ai'}
                                            alt={category?.name}
                                            onError={(e) => {
                                                e.target.src = 'https://placehold.co/100x100/1e293b/475569?text=Ai';
                                            }}
                                            className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-3xl object-cover bg-slate-900 border border-white/10 p-4 shadow-2xl"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
                                        <FiGrid /> Category
                                    </div>
                                    <h1 className="text-3xl lg:text-6xl font-black text-white tracking-tighter">
                                        {category?.name}
                                    </h1>
                                    <p className="text-slate-400 text-base lg:text-xl max-w-2xl leading-relaxed">
                                        {category?.description || `Explore the best AI tools for ${category?.name}. Find curated solutions to enhance your productivity and creativity.`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Tools Grid */}
                        <div className="space-y-12">
                            <div className="flex items-center justify-between border-b border-white/5 pb-8">
                                <h2 className="text-2xl font-bold text-white">
                                    {tools.length} Tools <span className="text-slate-500 font-normal">Found</span>
                                </h2>
                            </div>

                            {tools.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {tools.map((tool, key) => (
                                        <ToolCard key={key} tool={tool} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-40 text-center space-y-4">
                                    <div className="text-slate-600 text-6xl">∅</div>
                                    <h3 className="text-2xl font-bold text-white">No tools in this category yet</h3>
                                    <p className="text-slate-500">We&apos;re constantly updating our directory. Check back soon!</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
