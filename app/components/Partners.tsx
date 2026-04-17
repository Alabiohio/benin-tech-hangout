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
        <section id="sponsors" className="py-24 bg-white border-y border-gray-100 overflow-hidden">
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
