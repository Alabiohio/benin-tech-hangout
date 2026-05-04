'use client';

import React from 'react';

export default function Registration() {
    return (
        <section id="register" className="py-24 md:py-32 bg-biro-blue-dark relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-biro-blue-dark to-[#050a14] opacity-100"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                    {/* Left Info Panel */}
                    <div className="md:w-[45%] p-10 md:p-14 bg-biro-blue-dark flex flex-col justify-center text-white">
                        <h2 className="text-3xl md:text-4xl font-black font-righteous mb-6 leading-tight">
                            Secure Your <span className="text-highlight-yellow">Spot</span>
                        </h2>
                        <p className="text-blue-100/60 text-base md:text-lg mb-10 leading-relaxed font-medium">
                            Join the definitive gathering of builders, founders, and innovators in Benin City.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Ecosystem Networking",
                                "Strategic Workshops",
                                "Limited Edition Access",
                                "Main Stage Sessions"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-highlight-yellow"></div>
                                    <span className="text-sm md:text-base font-bold tracking-wide uppercase text-blue-100/80">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                                Location: Benin City, Edo State
                            </p>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="md:w-[55%] p-10 md:p-14 bg-white">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all text-gray-900 font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">Primary Interest</label>
                                    <select className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-biro-blue outline-none transition-all bg-white text-gray-900 font-medium cursor-pointer">
                                        <option>Select Interest</option>
                                        <option>Development</option>
                                        <option>Design</option>
                                        <option>Entrepreneurship</option>
                                        <option>Investment</option>
                                        <option>Sponsorship</option>
                                    </select>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-biro-blue-dark text-white font-black font-righteous text-lg rounded-xl hover:bg-highlight-yellow hover:text-biro-blue-dark transition-all active:scale-95 shadow-lg shadow-blue-900/10">
                                COMPLETE REGISTRATION
                            </button>

                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-4">
                                Limited seats available for BTF 2.0
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
