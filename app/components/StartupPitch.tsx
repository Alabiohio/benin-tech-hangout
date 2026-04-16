'use client';

import React from 'react';

export default function StartupPitch() {
    return (
        <section id="pitch" className="py-24 bg-biro-blue relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-biro-blue-dark via-biro-blue to-purple-900 opacity-90"></div>
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto px-4 py-12 md:p-24 bg-white/5 backdrop-blur-lg rounded-[2rem] border border-white/10 text-center">                  
                    <h2 className="text-4xl md:text-7xl font-black font-righteous text-white mb-8">Building something?</h2>
                    <p className="text-xl md:text-3xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Showcase your idea, gain visibility, and connect with the right people. Benin's next big thing starts here.
                    </p>
                    <button className="px-16 py-6 bg-highlight-yellow text-biro-blue-dark font-black font-righteous text-2xl rounded-2xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(251,191,36,0.3)]">
                        Apply to Pitch
                    </button>
                </div>
            </div>
        </section>
    );
}
