'use client';

import React from 'react';

export default function StartupPitch() {
    return (
        <section id="pitch" className="py-24 md:py-32 bg-biro-blue-dark relative overflow-hidden">
            {/* Subtle architectural background element */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black font-righteous text-white mb-8 leading-[0.95] tracking-tighter">
                        The Stage is <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight-yellow to-yellow-200">Yours.</span>
                    </h2>

                    <p className="text-md text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Are you building the future of the Benin tech ecosystem? Showcase your innovation, gain unparalleled visibility, and connect with strategic investors.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto px-12 py-3 bg-highlight-yellow text-biro-blue-dark font-black font-righteous text-lg rounded-xl hover:bg-white transition-all active:scale-95">
                            APPLY TO PITCH
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
