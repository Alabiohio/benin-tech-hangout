'use client';

import { useEffect, useState } from 'react';
import Button from './Button';

export default function PartnerCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = document.getElementById('partner-cta');

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <div id="partner-cta" className="w-full px-4 py-10 pb-28 relative overflow-visible bg-gradient-to-b from-white to-slate-100">
            <div className={`container mx-auto relative z-40 -mb-44 lg:-mb-62 py-10 px-4 border border-2 border-[#DEDEDE] bg-slate-950 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 items-stretch">
                    <div className="lg:flex-1 flex flex-col justify-between">
                        <h2 className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-white leading-tight mb-8">
                            BE PART OF THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">ECOSYSTEM LEADERS</span>
                        </h2>
                        <p className="text-lg text-slate-300 font-medium leading-relaxed mb-6 max-w-xl">
                            Partner with us to position your brand at the center of tech innovation in Edo State. Reach 1,000+ engaged builders and founders.
                        </p>
                    </div>

                    <div className="lg:flex-1 flex items-center justify-center lg:justify-end">
                        <div className="relative w-full max-w-sm">
                            <div className="absolute inset-0 rounded-xl"></div>
                            <div className="relative rounded-xl p-5 space-y-5 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <Button href="/sponsor" variant="biro" className="px-10 py-5 rounded-xl hover:scale-105 transition-all font-bold text-lg w-full text-center">Become a Sponsor →</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
