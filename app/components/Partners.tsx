'use client';

import React from 'react';
import Image from 'next/image';

import PartnerCTA from './PartnerCTA';

const partners = [
    { name: "Edo Community", logo: "/partners/Edo Community.png" },
    { name: "Edo Innovates", logo: "/partners/Edo Innovates Logo  PNG.png" },
    { name: "GDSC Benin", logo: "/partners/GDSC logo Leftsided.png" },
    { name: "Movarsity", logo: "/partners/Movarsity Logo.png" },
    { name: "She Code Africa", logo: "/partners/She Code Africa.png" },
    { name: "Superteam Edo", logo: "/partners/Superteam edo.png" },
    { name: "Google", logo: "/partners/images (3).png" },
    { name: "BTH Partner", logo: "/partners/IMG-20230901-WA0047.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20250327-WA0006.jpg.jpeg" },
    { name: "BTH Partner", logo: "/partners/IMG-20250708-WA0039.jpg.jpeg" },
];

export default function Partners() {
    return (
        <section id="sponsors" className="py-14 bg-[#f8f9fa] overflow-hidden">
            <div className="container mx-auto px-2 md:px-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-black font-righteous text-biro-blue-dark mb-6">
                        Our <span className="text-biro-blue">Partners</span>
              </h2>
            </div>

            <div className="container mx-auto px-2 md:px-4">
                <div className="relative py-6 px-2 bg-biro-blue/2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-r-3 border-biro-blue overflow-hidden">
                    <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-[2rem]"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-[2rem]"></div>
                    
                    <div className="flex w-max whitespace-nowrap animate-marquee">
                        {[1, 2, 3, 4].map((set) => (
                            <div key={set} className="flex gap-4 items-center px-2">
                                {partners.map((partner, idx) => (
                                    <div key={idx} className="flex items-center transition-all duration-300">
                                        <div className="relative w-30 h-20 md:w-48 md:h-24 flex items-center justify-center bg-white border border-slate-100 rounded-xl p-1 mx-2 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={partner.logo}
                                                    alt={partner.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
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
