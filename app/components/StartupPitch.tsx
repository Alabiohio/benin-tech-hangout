'use client';

import React from 'react';

export default function StartupPitch() {
    return (
        <section id="pitch" className="py-24 md:py-32 bg-biro-blue-dark relative overflow-hidden">
            {/* Fine dot grid pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                }}
            />

            {/* Architectural accent lines */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Top-right corner frame */}
                <div className="absolute top-12 right-12 w-48 h-48 border-t border-r border-white/[0.06]" />
                {/* Bottom-left corner frame */}
                <div className="absolute bottom-12 left-12 w-48 h-48 border-b border-l border-white/[0.06]" />
                {/* Horizontal rule */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.03]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
                        The Stage is <span className="text-highlight-yellow">Yours.</span>
                    </h2>

                    <p className="text-md text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                        Are you building the future of the Benin tech ecosystem? Showcase your innovation, gain unparalleled visibility, and connect with strategic investors.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="w-full sm:w-auto px-12 py-3.5 bg-white text-biro-blue-dark font-bold text-sm uppercase tracking-widest rounded-sm hover:bg-highlight-yellow transition-colors duration-300 active:scale-[0.98]">
                            Apply to Pitch
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
