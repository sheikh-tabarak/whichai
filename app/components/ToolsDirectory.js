'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import ToolCard from './ToolCard';
import { FiSearch, FiGrid, FiDollarSign, FiChevronRight, FiLoader } from 'react-icons/fi';
import { MdSearchOff } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ToolSkeleton } from "./Skeleton";

const ToolsDirectory = () => {
    const router = useRouter();
    const [tools, setTools] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Initial load
    const [loadingMore, setLoadingMore] = useState(false); // Pagination load

    // Pagination State
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Filters State
    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPricing, setSelectedPricing] = useState('All');

    const observer = useRef();

    // Debounce Search Text
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500); // 500ms debounce
        return () => clearTimeout(timer);
    }, [searchText]);

    // Initial Category Load
    useEffect(() => {
        axios.get('/api/categories').then(res => setCategories(res.data)).catch(console.error);
    }, []);

    // Main Fetch Function
    const fetchTools = useCallback(async (isLoadMore = false) => {
        if (!isLoadMore) setLoading(true);
        else setLoadingMore(true);

        try {
            const currentPage = isLoadMore ? page + 1 : 1;

            const params = {
                page: currentPage,
                limit: 24,
                search: debouncedSearch,
                category: selectedCategory,
                pricing: selectedPricing
            };

            const response = await axios.get('/api/aitool', { params });
            const { tools: newTools, pagination } = response.data;

            if (isLoadMore) {
                setTools(prev => [...prev, ...newTools]);
                setPage(currentPage);
            } else {
                setTools(newTools);
                setPage(1);
            }

            setHasMore(pagination.hasMore);
        } catch (error) {
            console.error("Error fetching tools:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [debouncedSearch, selectedCategory, selectedPricing, page]);

    // Trigger Fetch on Filters Change (Reset)
    useEffect(() => {
        fetchTools(false);
        // eslint-disable-next-line
    }, [debouncedSearch, selectedCategory, selectedPricing]);

    // Infinite Scroll Intersection Observer
    const lastToolElementRef = useCallback(node => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchTools(true);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore, fetchTools]);


    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
            <div className="w-[95%] max-w-screen-2xl mx-auto px-4 md:px-8 pt-44 lg:pt-48">

                {/* Header Section */}
                <div className="max-w-4xl mx-auto mb-12 lg:mb-16 space-y-6 lg:space-y-8 flex flex-col items-center">
                    <nav className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-white/10 rounded-full backdrop-blur-xl mb-2 lg:mb-4">
                        <Link href="/" className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors">Home</Link>
                        <FiChevronRight className="text-slate-700 text-xs" />
                        <span className="text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-300 italic">Tools Empire</span>
                    </nav>

                    <div className="text-center space-y-4">
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter text-center">
                            Explore the <br className="md:hidden" /><span className="animate-shine-gradient">AI Empire</span>
                        </h1>
                        <p className="text-slate-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4 text-center">
                            Discover the world&apos;s most comprehensive directory of artificial intelligence tools, curated for the next generation of creators.
                        </p>
                    </div>

                    {/* Main Search Bar */}
                    <div className="w-full relative group px-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                            <div className="pl-4 lg:pl-6 text-blue-500">
                                <FiSearch size={24} />
                            </div>
                            <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="flex-grow bg-transparent p-5 lg:p-6 text-white text-base lg:text-lg focus:outline-none placeholder:text-slate-600 w-full"
                                type="text"
                                placeholder="Search by name, category, or functionality..."
                            />
                        </div>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                        {/* Category Select */}
                        <div className="relative group w-full md:w-auto">
                            <label className="absolute -top-2.5 left-4 px-2 bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10">Category</label>
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus-within:border-blue-500/50 transition-all w-full md:w-auto">
                                <FiGrid className="text-blue-400 shrink-0" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer w-full md:w-auto pr-8"
                                >
                                    <option value="All" className="bg-slate-900">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id} className="bg-slate-900">{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Pricing Select */}
                        <div className="relative group w-full md:w-auto">
                            <label className="absolute -top-2.5 left-4 px-2 bg-slate-950 text-[10px] font-bold text-slate-500 uppercase tracking-widest z-10">Pricing</label>
                            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus-within:border-purple-500/50 transition-all w-full md:w-auto">
                                <FiDollarSign className="text-purple-400 shrink-0" />
                                <select
                                    value={selectedPricing}
                                    onChange={(e) => setSelectedPricing(e.target.value)}
                                    className="bg-transparent text-white text-sm font-bold focus:outline-none cursor-pointer w-full md:w-auto pr-8"
                                >
                                    <option value="All" className="bg-slate-900">Any Pricing</option>
                                    <option value="Free" className="bg-slate-900">Free</option>
                                    <option value="Freemium" className="bg-slate-900">Freemium</option>
                                    <option value="Paid" className="bg-slate-900">Paid</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-sm font-medium">Showing</span>
                        <span className="px-3 py-1 bg-blue-600/10 border border-blue-600/20 rounded-lg text-blue-400 font-black text-sm">
                            {tools.length} Tools
                        </span>
                    </div>
                </div>

                {/* Results Grid */}
                {loading && tools.length === 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <ToolSkeleton key={i} />)}
                    </div>
                ) : tools.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tools.map((tool, index) => {
                                if (tools.length === index + 1) {
                                    return <div ref={lastToolElementRef} key={index}><ToolCard tool={tool} /></div>;
                                } else {
                                    return <ToolCard key={index} tool={tool} />;
                                }
                            })}
                        </div>

                        {/* Load More Indicator */}
                        {loadingMore && (
                            <div className="py-12 flex justify-center w-full">
                                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/5 animate-pulse">
                                    <FiLoader className="animate-spin text-blue-400" />
                                    <span className="text-sm font-bold text-slate-400">Loading more intelligence...</span>
                                </div>
                            </div>
                        )}

                        {!hasMore && tools.length > 0 && (
                            <div className="py-20 text-center">
                                <p className="text-slate-600 text-sm uppercase tracking-widest font-bold">End of Results</p>
                                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent mx-auto mt-4"></div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="col-span-full py-40 flex flex-col items-center space-y-6 text-center">
                        <div className="p-10 bg-slate-900 border border-white/5 rounded-full text-slate-700 shadow-inner">
                            <MdSearchOff size={80} />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-white">No tools found</h2>
                            <p className="text-slate-500 text-lg max-w-md mx-auto">
                                We couldn&apos;t find any tools matching your current selection. Try adjusting your filters or search query.
                            </p>
                            <button
                                onClick={() => { setSearchText(''); setSelectedCategory('All'); setSelectedPricing('All'); }}
                                className="mt-8 px-6 py-2 text-blue-400 hover:text-white transition-colors font-bold"
                            >
                                Reset all filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolsDirectory;
