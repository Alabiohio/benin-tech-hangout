'use client';

import React from 'react';

const ticketTiers = [
    {
        name: "Regular Pass",
        price: "Free",
        features: [
            "Access to all general sessions",
            "Networking sessions"
        ],
        highlight: false,
    },
    {
        name: "Builders Pass",
        price: "₦15,000",
        features: [
            "Priority seating",
            "VIP access",
            "Exclusive sessions",
            "Branded Merch",
            "Refreshments",
            "Exclusive networking opportunities"
        ],
        highlight: true,
    },
    {
        name: "Startup/ Founders Pass",
        price: "₦30,000",
        features: [
            "Showcase your startup",
            "Connect with investors",
            "Access high-level sessions",
            "Access to Speakers",
            "Branded Merch",
            "Investors and Mentorship Program",
            "Refreshment with your PA"
        ],
        highlight: false,
    }
];

export default function Tickets({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section id="tickets" className="py-24 bg-gradient-to-br from-[#0A1026] to-[#04091A] relative overflow-hidden isolate shadow-2xl z-20">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-biro-blue/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-white/5 text-highlight-yellow border border-white/10 rounded-lg drop-shadow-md">
                        Tickets
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-righteous text-white mb-6">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-lg">Experience</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
                    {ticketTiers.map((tier, idx) => (
                        <div
                            key={idx}
                            className={`w-full md:w-[380px] relative p-10 rounded-[2.5rem] border backdrop-blur-xl flex flex-col group hover:-translate-y-2 transition-transform duration-500 ${tier.highlight ? 'border-blue-500/50 bg-gradient-to-b from-blue-600/10 to-[#0A0F24]/80 shadow-[0_0_30px_rgba(59,130,246,0.15)] z-10 scale-100 hover:scale-105' : 'border-white/10 bg-[#0A0F24]/60 hover:border-white/20 hover:bg-[#0A0F24] shadow-2xl'}`}
                        >
                            {/* Accent Glow on Hover */}
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors rounded-[2.5rem] pointer-events-none"></div>

                            <h3 className="text-2xl font-black font-righteous text-white mb-2 uppercase drop-shadow-sm">{tier.name}</h3>
                            <div className="mb-8">
                                <span className={`text-4xl font-black ${tier.highlight ? 'text-highlight-yellow' : 'text-blue-100'}`}>{tier.price}</span>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow relative z-10">
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${tier.highlight ? 'bg-highlight-yellow/20 text-highlight-yellow' : 'bg-white/10 text-white/50'}`}>
                                            ✓
                                        </div>
                                        <p className="text-blue-100/70 font-bold text-sm leading-relaxed">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={onRegisterClick}
                                className={`w-full py-4 rounded-2xl font-black font-righteous uppercase tracking-widest transition-all relative z-10 ${tier.highlight ? 'bg-highlight-yellow text-biro-blue hover:scale-105 shadow-[0_0_20px_rgba(252,211,77,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:scale-105'}`}
                            >
                                Get Your Pass
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
