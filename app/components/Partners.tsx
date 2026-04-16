'use client';

import React from 'react';
import Image from 'next/image';

const partners = [
    { name: "Edo Community", logo: "/partners/Edo Community.png" },
    { name: "Edo Innovates", logo: "/partners/Edo Innovates Logo  PNG.png" },
    { name: "GDSC Benin", logo: "/partners/GDSC logo Leftsided.png" },
    { name: "Movarsity", logo: "/partners/Movarsity Logo.png" },
    { name: "She Code Africa", logo: "/partners/She Code Africa.png" },
    { name: "Superteam Edo", logo: "/partners/Superteam edo.png" },
    { name: "Google", logo: "/partners/images (3).png" },
    { name: "BTH Partner", logo: "/partners/IMG-20230901-WA0047.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20241113-WA0008.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20250327-WA0006.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20250708-WA0039.jpg.jpeg" },
];

export default function Partners() {
    return (
        <section id="sponsors" className="py-24 bg-white border-y border-gray-100 overflow-hidden">
            <div className="container mx-auto px-6 mb-20 text-center">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-blue-50 text-biro-blue rounded-lg">
                    Partnership
                </span>
                <h2 className="text-4xl md:text-6xl font-black font-righteous text-gray-900 mb-8 leading-tight">
                    Grow With the <span className="text-biro-blue">Ecosystem</span>
                </h2>
                <p className="max-w-3xl mx-auto text-xl text-gray-500 font-medium mb-12">
                    Partner with us to reach a fast-growing tech audience and position your brand at the center of innovation in Benin City.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button className="px-10 py-4 bg-biro-blue text-white font-black font-righteous rounded-2xl hover:scale-105 transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest">
                        Become a Sponsor
                    </button>
                </div>
            </div>

            {/* Marquee Ticker */}
            <div className="relative py-4 bg-gray-50/50">
                <div className="flex w-max whitespace-nowrap animate-marquee">
                    {[1, 2, 3, 4].map((set) => (
                        <div key={set} className="flex gap-10 items-center px-10">
                            {partners.map((partner, idx) => (
                                <div key={idx} className="flex items-center transition-all duration-500 cursor-pointer group">
                                    <div className="relative w-32 h-24 md:w-24 md:h-24 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }
            `}</style>
        </section>
    );
}
