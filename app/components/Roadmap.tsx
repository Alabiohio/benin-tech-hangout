'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const roadmapData = [
    {
        month: "April",
        title: "Kickoff Publicity & Webinars",
        description: "Launching the journey of BTH 2.0 with strategic announcements and digital engagement across all platforms.",
        phase: "01"
    },
    {
        month: "May",
        title: "Community Spotlight & Partnerships",
        description: "Women in Tech, Web3, and AI series focusing on ecosystem strengthening through strategic webinars and local partnerships.",
        phase: "02"
    },
    {
        month: "June",
        title: "Build With Us — Workshops",
        description: "Hands-on technical deep-dives for developers and ecosystem builders to foster local innovation and technical excellence.",
        phase: "03"
    },
    {
        month: "July",
        title: "Founder Stories & Stakeholders Meeting",
        description: "Connecting visionaries, capital, and key ecosystem anchors through the Tech Money Series and private stakeholder engagements.",
        phase: "04"
    },
    {
        month: "August",
        title: "Startup Spotlight & Pitch Competition",
        description: "Showcasing the brightest innovations in the ecosystem arena to potential investors and global partners.",
        phase: "05"
    },
    {
        month: "September",
        title: "Campus Tech Tour",
        description: "Inspiring the next generation of tech talent across major universities and technical colleges in Edo State.",
        phase: "06"
    },
    {
        month: "October 2nd",
        title: "Main Event — The Ecosystem Convergence",
        description: "The definitive gathering where innovation meets opportunity. The culmination of the year's efforts in a single day of impact.",
        phase: "Finale",
        isMain: true
    }
];

interface RoadmapItem {
    month: string;
    title: string;
    description: string;
    phase: string;
    isMain?: boolean;
}

const AUTO_SWITCH_INTERVAL = 5000;

function MobileRoadmapNavigator({ roadmapData, onRegisterClick }: { roadmapData: RoadmapItem[]; onRegisterClick: () => void }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = roadmapData[activeIdx];
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIdx((prev) => (prev + 1) % roadmapData.length);
        }, AUTO_SWITCH_INTERVAL);
        return () => clearInterval(timer);
    }, [roadmapData.length]);

    useEffect(() => {
        const activeTab = document.getElementById(`mobile-tab-${activeIdx}`);
        if (activeTab && scrollRef.current) {
            scrollRef.current.scrollTo({
                left: activeTab.offsetLeft - 20,
                behavior: 'smooth'
            });
        }
    }, [activeIdx]);

    return (
        <div className="md:hidden space-y-8" data-aos="fade-up">
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-2 px-4 pb-2 no-scrollbar border-b border-black/5"
            >
                {roadmapData.map((item, idx) => (
                    <button
                        key={`tab-${idx}`}
                        id={`mobile-tab-${idx}`}
                        onClick={() => setActiveIdx(idx)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 ${
                            idx === activeIdx 
                                ? 'text-biro-blue-dark border-biro-blue-dark' 
                                : 'text-gray-400 border-transparent'
                        }`}
                    >
                        {item.month}
                    </button>
                ))}
            </div>

            <div className="px-4">
                <div className={`p-8 bg-white border border-black/5 rounded-2xl shadow-sm transition-all duration-500`}>
                    <h3 className={`text-2xl font-black font-righteous text-gray-900 mb-4 leading-tight`}>
                        {active.title}
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-8">
                        {active.description}
                    </p>

                    {active.isMain ? (
                        <button
                            onClick={onRegisterClick}
                            className="w-full py-4 bg-highlight-yellow text-white font-black font-righteous rounded-xl shadow-lg shadow-highlight-yellow/20"
                        >
                            REGISTER NOW
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            {roadmapData.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-1 rounded-full transition-all duration-500 ${i === activeIdx ? 'w-8 bg-biro-blue-dark' : 'w-2 bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Roadmap({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="py-18 md:py-20 relative overflow-hidden bg-[#f8f9fc]" id="roadmap">
            {/* Minimal Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-6 md:mb-12" data-aos="fade-up">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-black font-righteous text-biro-blue-dark tracking-tighter leading-none mb-0">
                            Roadmap
                        </h2>
                    </div>
                </div>

                <div className="relative">
                    {/* New Mature Desktop Layout: Segmented Grid Flow */}
                    <div className="hidden md:block">
                        <div className="grid grid-cols-12 gap-y-8">
                            {roadmapData.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="col-span-12 grid grid-cols-12 items-start group"
                                    data-aos="fade-up"
                                >
                                    {/* Month & Phase Label (Left) */}
                                    <div className="col-span-3 pt-2">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-3xl font-black font-righteous text-biro-blue-dark/20 group-hover:text-biro-blue-dark transition-colors duration-500">
                                                {item.month}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Connection Line & Dot (Center) */}
                                    <div className="col-span-1 flex flex-col items-center relative h-full">
                                        <div className="w-px h-full bg-gray-200 absolute top-0 bottom-0 left-1/2 -translate-x-1/2"></div>
                                        <div className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center relative z-10 group-hover:border-biro-blue-dark group-hover:scale-110 transition-all duration-500 shadow-sm">
                                            <div className={`w-3 h-3 rounded-full ${item.isMain ? 'bg-highlight-yellow' : 'bg-gray-200 group-hover:bg-biro-blue-dark'} transition-colors`}></div>
                                        </div>
                                    </div>

                                    {/* Content Card (Right) */}
                                    <div className="col-span-8 pl-6">
                                        <div className={`max-w-3xl transition-all duration-500 group-hover:translate-x-2`}>
                                            <h3 className="text-xl md:text-2xl font-black font-righteous text-gray-900 mb-6 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-500 text-md leading-relaxed font-medium mb-8 max-w-2xl">
                                                {item.description}
                                            </p>

                                            {item.isMain && (
                                                <button
                                                    onClick={onRegisterClick}
                                                    className="inline-flex items-center gap-3 px-10 py-4 bg-biro-blue-dark text-white font-black font-righteous rounded-xl hover:bg-highlight-yellow transition-all shadow-xl shadow-blue-900/10 active:scale-95"
                                                >
                                                    SECURE YOUR SPOT
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                </button>
                                            )}

                                            {!item.isMain && (
                                                <div className="h-px w-20 bg-gray-100 group-hover:w-full transition-all duration-700"></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Layout (Remains consistent with the mature mobile navigator) */}
                    <MobileRoadmapNavigator roadmapData={roadmapData} onRegisterClick={onRegisterClick} />
                </div>
            </div>

            {/* Subtle floating numbers background */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden lg:block opacity-[0.02] select-none pointer-events-none">
                <span className="text-[30rem] font-black text-biro-blue-dark leading-none">BTH</span>
            </div>
        </section>
    );
}
