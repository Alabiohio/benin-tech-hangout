'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const roadmapData = [
    {
        month: "April",
        title: "Kickoff Publicity & Webinars",
        description: "Launching the journey of BTH 2.0 with strategic announcements and digital engagement.",
        gradient: "from-blue-600 to-indigo-600",
        borderColor: "border-blue-500",
        shadowColor: "shadow-blue-500/20",
        icon: "🌱"
    },
    {
        month: "May",
        title: "Tech Community Spotlight & Partnerships + Webinars",
        description: "Women in Tech, Web3, AI series and ecosystem strengthening.",
        gradient: "from-indigo-600 to-purple-600",
        borderColor: "border-indigo-500",
        shadowColor: "shadow-indigo-500/20",
        icon: "🌿"
    },
    {
        month: "June",
        title: "Build With Us — Workshops & Trainings",
        description: "Hands-on technical deep-dives for developers and ecosystem builders.",
        gradient: "from-purple-600 to-pink-600",
        borderColor: "border-purple-500",
        shadowColor: "shadow-purple-500/20",
        icon: "🛠️"
    },
    {
        month: "July",
        title: "Founder Stories, Tech Money Series & Stakeholders Meeting",
        description: "Connecting visionaries, capital, and key ecosystem anchors.",
        gradient: "from-pink-600 to-rose-600",
        borderColor: "border-pink-500",
        shadowColor: "shadow-pink-500/20",
        icon: "🌳"
    },
    {
        month: "August",
        title: "Startup Spotlight & Pitch Competition",
        description: "Showcasing the brightest innovations in the ecosystem arena.",
        gradient: "from-rose-600 to-orange-500",
        borderColor: "border-rose-500",
        shadowColor: "shadow-rose-500/20",
        icon: "🌺"
    },
    {
        month: "September",
        title: "Campus Tech Tour",
        description: "Inspiring the next generation of tech talent across universities.",
        gradient: "from-blue-600 to-red-700",
        borderColor: "border-blue-500",
        shadowColor: "shadow-blue-500/20",
        icon: "🎓"
    },
    {
        month: "October 2nd",
        title: "Main Event — The Ecosystem Convergence",
        description: "The definitive gathering where innovation meets opportunity.",
        gradient: "from-highlight-yellow to-red-400",
        borderColor: "border-highlight-yellow",
        shadowColor: "shadow-highlight-yellow/40",
        icon: "✨",
        isMain: true
    }
];

// Gradient CSS values mapped from Tailwind class names for inline SVG usage
const gradientMap: Record<string, [string, string]> = {
    'from-blue-600 to-indigo-600': ['#2563eb', '#4f46e5'],
    'from-indigo-600 to-purple-600': ['#4f46e5', '#9333ea'],
    'from-purple-600 to-pink-600': ['#9333ea', '#db2777'],
    'from-pink-600 to-rose-600': ['#db2777', '#e11d48'],
    'from-rose-600 to-orange-500': ['#e11d48', '#f97316'],
    'from-blue-600 to-red-700': ['#2563eb', '#b91c1c'],
    'from-highlight-yellow to-red-400': ['#b91c1c', '#f87171'],
};

interface RoadmapItem {
    month: string;
    title: string;
    description: string;
    gradient: string;
    borderColor: string;
    shadowColor: string;
    icon: string;
    isMain?: boolean;
}

const AUTO_SWITCH_INTERVAL = 4000; // 4s per slide
const PAUSE_AFTER_INTERACTION = 8000; // 8s pause after manual tap

function MobileStoryRoadmap({ roadmapData, onRegisterClick }: { roadmapData: RoadmapItem[]; onRegisterClick: () => void }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
    const active = roadmapData[activeIdx];
    const activeSlug = active.month.toLowerCase().replace(/\s+/g, '-');
    const colors = gradientMap[active.gradient] || ['#2563eb', '#4f46e5'];

    const handleIdxChange = useCallback((idx: number) => {
        if (idx === activeIdx) return;
        setDirection(idx > activeIdx ? 'next' : 'prev');
        setActiveIdx(idx);
    }, [activeIdx]);

    // Auto-advance
    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            const nextIdx = (activeIdx + 1) % roadmapData.length;
            // Always feel like 'next' for auto-looping
            setDirection('next');
            setActiveIdx(nextIdx);
        }, AUTO_SWITCH_INTERVAL);
        return () => clearInterval(timer);
    }, [activeIdx, isPaused, roadmapData.length]);

    // Manual selection — pauses auto-advance temporarily
    const handleManualSelect = useCallback((idx: number) => {
        handleIdxChange(idx);
        setIsPaused(true);
        if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
        pauseTimerRef.current = setTimeout(() => setIsPaused(false), PAUSE_AFTER_INTERACTION);
    }, [handleIdxChange]);

    // Cleanup pause timer on unmount
    useEffect(() => {
        return () => { if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); };
    }, []);

    return (
        <div className="md:hidden" data-aos="fade-up">
            {/* Story Rings Row */}
            <div className="flex overflow-x-auto gap-4 px-2 pb-6 no-scrollbar">
                {roadmapData.map((item, idx) => {
                    const isActive = idx === activeIdx;
                    const ringColors = gradientMap[item.gradient] || ['#2563eb', '#4f46e5'];
                    const ringId = `story-ring-grad-${idx}`;

                    return (
                        <button
                            key={`story-${item.month}-${idx}`}
                            id={`roadmap-story-${item.month.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => handleManualSelect(idx)}
                            className={`flex flex-col items-center gap-2 flex-shrink-0 transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-90'}`}
                            aria-label={`View ${item.month} milestone`}
                        >
                            {/* Gradient Ring via SVG */}
                            <div className="relative w-16 h-16">
                                <svg viewBox="0 0 68 68" className="absolute inset-0 w-full h-full">
                                    <defs>
                                        <linearGradient id={ringId} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={ringColors[0]} />
                                            <stop offset="100%" stopColor={ringColors[1]} />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="34" cy="34" r="30" fill="none" stroke={`url(#${ringId})`}
                                        strokeWidth={isActive ? '4' : '3'}
                                        strokeDasharray={isActive ? 'none' : '6 4'}
                                    />
                                </svg>
                                <div className={`absolute inset-[6px] rounded-full bg-white flex items-center justify-center text-2xl shadow-sm ${isActive ? 'ring-2 ring-white' : ''}`}>
                                    {item.icon}
                                </div>
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                {item.month}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Active Detail Card */}
            <div className="px-1" key={activeIdx}>
                <div
                    className={`relative rounded-[2rem] overflow-hidden shadow-2xl border border-black/10 bg-white/95 backdrop-blur-md transition-all duration-500 ${active.isMain ? 'ring-4 ring-highlight-yellow/40' : ''}`}
                    style={{ animation: `${direction === 'next' ? 'slideNext' : 'slidePrev'} 0.5s cubic-bezier(0.4, 0, 0.2, 1)` }}
                >
                    {/* Full-width gradient hero band */}
                    <div className={`relative h-36 bg-gradient-to-r ${active.gradient} flex items-end px-8 pb-6 overflow-hidden`}>
                        {/* Overlay texture */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")', backgroundSize: '20px 20px' }}></div>
                        {/* Large watermark number */}
                        <span className="absolute -right-4 -top-6 text-[10rem] font-black text-white/[0.08] leading-none select-none pointer-events-none">
                            {activeIdx + 1}
                        </span>
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-lg">
                                {active.icon}
                            </div>
                            <div>
                                <span className="block text-[10px] text-white/80 font-black uppercase tracking-[0.2em]">
                                    Phase {activeIdx + 1} of {roadmapData.length}
                                </span>
                                <span className="block text-xl text-white font-black uppercase tracking-widest drop-shadow-sm">
                                    {active.month}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-8">
                        <h3 className={`text-2xl font-black font-righteous text-gray-900 mb-4 leading-tight ${active.isMain ? 'italic text-3xl' : ''}`}>
                            {active.title}
                        </h3>
                        <p className="text-gray-600 font-bold text-base leading-relaxed">
                            {active.description}
                        </p>

                        {active.isMain && (
                            <div className="pt-6 mt-4 border-t border-dashed border-black/10">
                                <button
                                    id={`roadmap-story-register-${activeSlug}`}
                                    onClick={onRegisterClick}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-highlight-yellow text-biro-blue-dark font-black font-righteous rounded-2xl shadow-[0_10px_20px_rgba(251,191,36,0.3)] active:scale-95 transition-transform"
                                >
                                    Register Now
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center justify-between px-8 pb-6">
                        <button
                            onClick={() => handleManualSelect(Math.max(0, activeIdx - 1))}
                            disabled={activeIdx === 0}
                            className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-600 disabled:opacity-20 active:scale-90 transition-all"
                            aria-label="Previous milestone"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                        </button>

                        {/* Dot indicators */}
                        <div className="flex gap-1.5">
                            {roadmapData.map((_, i) => (
                                <button
                                    key={`dot-${i}`}
                                    onClick={() => handleManualSelect(i)}
                                    className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 h-2' : 'w-2 h-2 bg-black/15 hover:bg-black/25'}`}
                                    style={i === activeIdx ? { background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})` } : {}}
                                    aria-label={`Go to milestone ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => handleManualSelect(Math.min(roadmapData.length - 1, activeIdx + 1))}
                            disabled={activeIdx === roadmapData.length - 1}
                            className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-600 disabled:opacity-20 active:scale-90 transition-all"
                            aria-label="Next milestone"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Inline keyframe animation */}
            <style jsx>{`
                @keyframes slideNext {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slidePrev {
                    from { opacity: 0; transform: translateX(-30px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
}

export default function Roadmap({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="py-24 md:py-32 relative overflow-hidden" id="roadmap">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <Image
                    src="/roadmap.png"
                    alt="Roadmap Background"
                    fill
                    className="object-contain opacity-40"
                />
            </div>

            {/* Ambient Lighting Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-highlight-yellow/5 rounded-full blur-[150px] opacity-40 pointer-events-none"></div>

            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                {/* Header Sub-section */}
                <div className="text-center mb-24 md:mb-40" data-aos="fade-up">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-black/5 border border-black/10 rounded-md text-blue-800">
                        Event Timeline
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-righteous text-biro-blue-dark tracking-tighter leading-none mb-6">
                        Road <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-biro-blue-dark">Map</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl md:text-2xl text-black/80 font-black tracking-tight uppercase">Benin Tech Hangout 2.0</p>
                </div>

                <div className="relative">
                    {/* Desktop Layout (md and up) */}
                    <div className="hidden md:block">
                        {/* The Main "Trunk" of the Tree */}
                        <div className="absolute left-1/2 top-4 bottom-4 w-1.5 bg-[#0A101C] -translate-x-1/2 z-0 border-x border-white/5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]"></div>

                        {/* Glowing sap/energy flowing through the trunk */}
                        <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-highlight-yellow -translate-x-1/2 z-0 opacity-40 blur-[2px] rounded-full"></div>

                        <div className="space-y-24 relative z-10">
                            {roadmapData.map((item, idx) => {
                                const isEven = idx % 2 === 0;
                                const itemSlug = item.month.toLowerCase().replace(/\s+/g, '-');

                                return (
                                    <div
                                        key={`${item.month}-${idx}`}
                                        id={`roadmap-desktop-${itemSlug}`}
                                        className={`relative flex flex-row items-center w-full group ${!isEven ? 'flex-row-reverse' : ''}`}
                                        data-aos={isEven ? "fade-right" : "fade-left"}
                                    >
                                        {/* Center Node (The Tree Node / Junction) */}
                                        <div className="absolute left-1/2 w-10 h-10 rounded-full bg-[#02010A] border-4 -translate-x-1/2 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 group-hover:scale-110 transition-transform duration-500" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.gradient} shadow-[0_0_15px_rgba(255,255,255,0.4)]`}></div>
                                        </div>

                                        {/* Connector Branch */}
                                        <div
                                            className={`absolute top-1/2 h-[2px] bg-gradient-to-r ${isEven ? item.gradient : item.gradient.split(' ').reverse().join(' ')} opacity-60 z-0 group-hover:h-1 transition-all duration-500`}
                                            style={{
                                                width: '80%',
                                                left: isEven ? '42%' : 'auto',
                                                right: isEven ? 'auto' : '42%',
                                                transform: 'translateY(-50%)'
                                            }}
                                        ></div>

                                        <div className="w-[42%]"></div>

                                        {/* Content Card */}
                                        <div className={`w-[42%] relative z-40`}>
                                            <div className={`py-12 px-6 border border-black/10 rounded-[2rem] bg-white bg-gradient-to-br from-white to-white/90 ${item.shadowColor} shadow-xl backdrop-blur-md group-hover:border-black/20 group-hover:-translate-y-2 transition-all duration-500 relative overflow-hidden ${item.isMain ? 'ring-2 ring-highlight-yellow' : ''}`}>

                                                {/* Unique Graphic Element (Desktop) */}
                                                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${item.gradient} opacity-[0.03] blur-[40px] rounded-full pointer-events-none transition-transform duration-1000 group-hover:scale-150`}></div>
                                                <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr ${item.gradient} opacity-[0.02] blur-[30px] transition-transform duration-1000 group-hover:scale-150 rounded-full pointer-events-none`}></div>

                                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}></div>

                                                <div className="flex flex-col relative z-10">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <span className="text-4xl group-hover:animate-bounce">{item.icon}</span>
                                                        <span className={`text-lg font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}>
                                                            {item.month}
                                                        </span>
                                                    </div>

                                                    <h3 className={`text-4xl font-black font-righteous text-gray-900 mb-4 leading-tight ${item.isMain ? 'italic' : ''}`}>
                                                        {item.title}
                                                    </h3>

                                                    <p className="text-gray-700 font-bold leading-relaxed text-lg">
                                                        {item.description}
                                                    </p>

                                                    {item.isMain && (
                                                        <div className="mt-8">
                                                            <button
                                                                id={`roadmap-desktop-register-${itemSlug}`}
                                                                onClick={onRegisterClick}
                                                                className="inline-flex items-center gap-2 px-6 py-3 bg-highlight-yellow text-biro-blue-dark font-black font-righteous rounded-xl hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(251,191,36,0.3)]"
                                                            >
                                                                Register Now
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Layout (below md) - Story Rings + Detail Card */}
                    <MobileStoryRoadmap roadmapData={roadmapData} onRegisterClick={onRegisterClick} />
                </div>
            </div>
        </section>
    );
}
