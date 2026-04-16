'use client';

import React from 'react';

const highlightItems = [
    { label: "3000+ Attendees", icon: "🚀", color: "from-blue-500/20 to-blue-600/5", border: "border-blue-500/20", text: "text-blue-400" },
    { label: "100+ Communities", icon: "🤖", color: "from-indigo-500/20 to-indigo-600/5", border: "border-indigo-500/20", text: "text-indigo-400" },
    { label: "Tech Exhibition", icon: "💼", color: "from-violet-500/20 to-violet-600/5", border: "border-violet-500/20", text: "text-violet-400" },
    { label: "Networking", icon: "🤝", color: "from-cyan-500/20 to-cyan-600/5", border: "border-cyan-500/20", text: "text-cyan-400" },
    { label: "Startup Pitch", icon: "💡", color: "from-yellow-500/20 to-yellow-600/5", border: "border-yellow-500/20", text: "text-yellow-400" },
    { label: "Tech Money Sessions", icon: "💰", color: "from-green-500/20 to-green-600/5", border: "border-green-500/20", text: "text-green-400" },
    { label: "Creative Economy", icon: "✅", color: "from-pink-500/20 to-pink-600/5", border: "border-pink-500/20", text: "text-pink-400" },
    { label: "Policy & Regulations", icon: "📜", color: "from-orange-500/20 to-orange-600/5", border: "border-orange-500/20", text: "text-orange-400" },
];

export default function Highlights() {
    return (
        <section id="highlights" className="py-20 bg-gradient-to-br from-[#0B132B] to-[#020617] relative z-20 -mt-12 overflow-hidden border-t border-white/[0.02]">

            {/* Ultra-premium Ambient Glows */}
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none mix-blend-screen"></div>

            {/* Top edge fade */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0A0F24] to-transparent z-10 pointer-events-none"></div>

            <div className="container mx-auto relative z-10 mt-8">
                {/* Refined Section label */}
                <div className="flex items-center gap-4 justify-center mb-10">
                    <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-white/10"></div>
                    <p className="text-white/40 font-black uppercase tracking-[0.4em] text-[10px] drop-shadow-lg">Event Highlights</p>
                    <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-white/10"></div>
                </div>

                {/* Premium Micro-cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 relative">

                    {/* Subtle grid pattern background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10"></div>

                    {highlightItems.map((item, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative overflow-hidden flex items-center justify-between px-5 py-4 
                                rounded-xl bg-gradient-to-br ${item.color}
                                border border-white/[0.08] hover:border-white/30 
                                shadow-[inset_0_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.4)]
                                hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
                                transition-all duration-500 cursor-default backdrop-blur-3xl
                            `}
                        >
                            {/* Hover color wash */}
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"></div>

                            <span className={`relative text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] ${item.text} opacity-90 group-hover:opacity-100 group-hover:brightness-125 transition-all duration-400 leading-tight pr-2 z-10`}>
                                {item.label}
                            </span>

                            <span className="relative text-2xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 z-10 drop-shadow-md">
                                {item.icon}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
