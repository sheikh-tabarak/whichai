'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiArrowUpRight, FiImage } from 'react-icons/fi';
import ToolIcon from './ToolIcon';

const ToolCard = ({ tool, preview = false }) => {
    const router = useRouter();
    const slug = tool?.slug || tool?._id;

    const navigateToDetails = () => {
        if (!preview) {
            router.push('/tool/' + slug);
        }
    };

    return (
        <div
            onClick={navigateToDetails}
            className={`group relative flex flex-col w-full min-h-[420px] bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 overflow-hidden shadow-2xl ${preview ? '' : 'hover:scale-[1.02] hover:bg-slate-800/60 hover:border-white/20 cursor-pointer'
                }`}
        >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[80px] group-hover:bg-blue-600/20 transition-all duration-500"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 blur-[80px] group-hover:bg-purple-600/20 transition-all duration-500"></div>

            {/* Top Bar */}
            <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-white/5 border border-white/10 rounded-2xl">
                    {preview ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 border border-white/5">
                            <FiImage size={20} />
                        </div>
                    ) : (
                        <ToolIcon tool={tool} className="w-12 h-12 rounded-xl object-cover" />
                    )}
                </div>

            </div>

            {/* Content */}
            <div className="flex-grow space-y-4">
                <div className="space-y-1">
                    <h4 className={`text-white text-xl font-bold tracking-tight transition-colors ${preview ? '' : 'group-hover:text-blue-400'}`}>
                        {tool?.name || 'Untitled Tool'}
                    </h4>
                    <p className="revolution-text text-xs font-bold uppercase tracking-widest">
                        {tool?.category?.name || 'AI Assistant'}
                    </p>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {tool?.description || 'No description available for this cutting-edge AI tool.'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {tool?.tags?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-300 font-medium whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                    {tool?.tags?.length > 3 && (
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-300 font-medium">
                            +{tool.tags.length - 3}
                        </span>
                    )}
                </div>
            </div>

            {/* Pricing Buffer */}
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Starting from</span>
                    <span className="text-white font-bold text-lg">{tool?.pricing === 'Paid' ? '$19/mo' : (tool?.pricing || 'Free')}</span>
                </div>
                <div className={`w-10 h-10 rounded-full revolution-bg flex items-center justify-center text-white transform transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] ${preview ? '' : 'group-hover:rotate-45 group-hover:scale-110'}`}>
                    <FiArrowUpRight size={20} />
                </div>
            </div>
        </div>
    );
};

export default ToolCard;