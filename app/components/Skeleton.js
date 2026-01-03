'use client';
import React from 'react';

export const CategorySkeleton = () => (
    <div className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl animate-pulse">
        <div className="w-6 h-6 bg-white/10 rounded-lg"></div>
        <div className="w-24 h-4 bg-white/10 rounded-md"></div>
    </div>
);

export const ToolSkeleton = () => (
    <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 min-h-[420px] flex flex-col animate-pulse">
        <div className="flex justify-between items-start mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl"></div>
            <div className="w-12 h-6 bg-white/10 rounded-full"></div>
        </div>
        <div className="flex-grow space-y-4">
            <div className="space-y-2">
                <div className="w-3/4 h-6 bg-white/10 rounded-md"></div>
                <div className="w-1/2 h-4 bg-white/10 rounded-md"></div>
            </div>
            <div className="space-y-2">
                <div className="w-full h-4 bg-white/10 rounded-md"></div>
                <div className="w-full h-4 bg-white/10 rounded-md"></div>
                <div className="w-2/3 h-4 bg-white/10 rounded-md"></div>
            </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="space-y-2">
                <div className="w-20 h-2 bg-white/10 rounded-md"></div>
                <div className="w-16 h-4 bg-white/10 rounded-md"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10"></div>
        </div>
    </div>
);
