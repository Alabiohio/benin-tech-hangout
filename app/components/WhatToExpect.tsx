'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WhatToExpect({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean, setIsModalOpen: (open: boolean) => void }) {
    const expectations = [
        {
            title: "Panels",
            desc: "Listen to practical conversations from industry experts and ecosystem leaders.",
            color: "from-[#7C3AED] to-[#5B21B6]",
            textColor: "text-white"
        },
        {
            title: "Exhibition",
            desc: "Discover what's being built in Benin's tech ecosystem through live demos.",
            color: "from-[#F97316] to-[#C2410C]",
            textColor: "text-white"
        },
        {
            title: "Networking",
            desc: "Forge strategic collaborations and partnerships with builders, founders, and leaders.",
            color: "from-[#FBBF24] to-[#D97706]",
            textColor: "text-biro-blue-dark"
        },
        {
            title: "Startup Pitch",
            desc: "Watch local startups showcase their ideas for visibility and investor connections.",
            color: "from-[#10B981] to-[#047857]",
            textColor: "text-white"
        },
        {
            title: "Opportunities",
            desc: "Explore job fairs, connect with investors, and discover various pools of opportunity.",
            color: "from-[#FBBF24] to-[#D97706]",
            textColor: "text-biro-blue-dark"
        },
        {
            title: "Tech Money",
            desc: "Learn about financing, venture capital, and building profitable tech businesses.",
            color: "from-blue-600 to-indigo-700",
            textColor: "text-white"
        },
        {
            title: "Mentorship",
            desc: "Connect with mentors who can guide your journey in the tech space.",
            color: "from-pink-500 to-rose-600",
            textColor: "text-white"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden" id="what-to-expect">
            {/* Background decorative spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-righteous text-white tracking-tighter leading-none mb-6">
                        What to expect <span className="text-white/20 select-none">at BTH 2.0</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-xl text-white/40 font-medium">BTH 2.0 is more than just a tech meetup. It's where innovation meets opportunity in Benin City.</p>
                </div>

                <div className="flex flex-col gap-8 md:gap-10">
                    {expectations.map((item, idx) => (
                        <div
                            key={idx}
                            style={{ transitionDelay: `${idx * 50}ms` }}
                            className={`group relative bg-gradient-to-br ${item.color} ${item.textColor} px-10 py-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:-rotate-1 shadow-[0_45px_100px_-25px_rgba(0,0,0,0.6)]`}
                            data-aos="fade-up"
                        >
                            {/* Inner Glass Highlight Overlay */}
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-white/5 to-white/20 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className="max-w-3xl text-center md:text-left">
                                    <h3 className="text-4xl md:text-6xl font-black font-righteous mb-4 md:mb-6 tracking-tighter leading-none group-hover:translate-x-2 transition-transform duration-500">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg md:text-2xl font-medium opacity-80 group-hover:opacity-100 transition-opacity leading-snug md:leading-tight">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>

                            {/* Background Floating Icon/Symbol Decor */}
                            <div className="absolute top-1/2 -right-4 -translate-y-1/2 text-[10rem] md:text-[15rem] font-black font-righteous text-black/5 group-hover:text-black/10 transition-all duration-700 rotate-[15deg] group-hover:rotate-[5deg] select-none pointer-events-none">
                                {idx + 1}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Exhibition Detail Section */}
                <div className="mt-32 px-4 py-10 md:p-20 bg-white/5 rounded-[2rem] border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h3 className="text-3xl md:text-6xl font-black font-righteous text-white mb-6">Discover. Showcase. Connect.</h3>
                        <p className="text-white/60 text-lg md:text-2xl max-w-3xl mb-12 font-medium leading-relaxed">
                            The exhibition brings together startups, creators, and tech brands to showcase what they’re building and solving.
                            Walk through live demos, interact with products, and meet the teams behind them.
                            <span className="block mt-4 text-white">It’s where ideas become visible and opportunities begin.</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6">
                            <Link
                                href="/exhibitor"
                                className="px-12 py-5 bg-white text-biro-blue-dark font-black font-righteous rounded-2xl hover:scale-105 transition-all text-xl"
                            >
                                Get an Exhibition Slot
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center" data-aos="fade-up">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative px-14 py-6 bg-highlight-yellow text-biro-blue-dark font-black font-righteous rounded-[2.5rem] transition-all hover:scale-105 active:scale-95 text-xl shadow-[0_20px_50px_rgba(251,191,36,0.3)] overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                            REGISTER NOW
                            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </button>
                </div>
            </div>
        </section>
    );
}
