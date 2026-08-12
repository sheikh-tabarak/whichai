import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-700">
            <div className="relative group">
                {/* Main Glass Orb */}
                <div className="w-20 h-20 bg-slate-900 border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
                    {/* Inner Pulsing Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent animate-pulse"></div>

                    {/* The "Brain" Dot */}
                    <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] relative z-10 transition-all duration-1000 group-hover:scale-150">
                        <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75"></div>
                    </div>
                </div>

                {/* Symmetrical Orbitals */}
                <div className="absolute -inset-4 border border-blue-500/20 rounded-[40px] animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute -inset-8 border border-purple-500/10 rounded-[50px] animate-[spin_6s_linear_infinite_reverse]"></div>
            </div>

            {/* Premium Progress Indicator */}
            <div className="flex flex-col items-center gap-3">
                <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 transition-all duration-1000">
                    Initializing Intelligence
                </p>
            </div>
        </div>
    );
};

export default Loading;