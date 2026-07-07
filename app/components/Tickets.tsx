'use client';

import { useEffect, useState } from 'react';
import Button from './Button';

const ticketTiers = [
    {
        name: "General Pass",
        price: "FREE",
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
        name: "VIP Pass",
        price: "₦25,000",
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
    const [visibleCards, setVisibleCards] = useState<number[]>([]);

    useEffect(() => {
        const cards = document.querySelectorAll<HTMLElement>('[data-ticket-card]');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute('data-ticket-index'));
                    if (entry.isIntersecting) {
                        setVisibleCards((prev) => (prev.includes(index) ? prev : [...prev, index]));
                    }
                });
            },
            { threshold: 0.2 }
        );

        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="tickets" className="py-24 bg-[#f8fbff] relative overflow-hidden isolate z-20">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-7xl font-black font-cabinet-grotesk text-biro-blue-dark mb-6">
                        Get Your <span className="text-biro-blue">Event Pass</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-10 max-w-7xl mx-auto">
                    {ticketTiers.map((tier, idx) => {
                        const isVisible = visibleCards.includes(idx);
                        const direction = idx === 0 ? '-translate-x-8' : idx === 2 ? 'translate-x-8' : 'translate-y-4';

                        return (
                            <div
                                key={idx}
                                data-ticket-card
                                data-ticket-index={idx}
                                className={`w-full md:w-[380px] relative p-10 rounded-xl border flex flex-col group hover:-translate-y-2 transition-all duration-700 ease-out ${tier.highlight ? 'border-biro-blue bg-biro-blue-dark' : 'border-blue-100 bg-white'} ${isVisible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0 ' + direction}`}
                            >
                            <div className="mb-1">
                                <span className={`text-4xl md:text-5xl font-cabinet-grotesk font-black flex items-start ${tier.highlight ? 'text-white' : 'text-biro-blue'}`}>
                                    {tier.price.startsWith('₦') ? (
                                        <>
                                            <sup className="text-xl md:text-2xl mt-2 mr-1">₦</sup>
                                            {tier.price.substring(1)}
                                        </>
                                    ) : (
                                        tier.price
                                    )}
                                </span>
                            </div>
                            <h3 className={`text-2xl mb-8 font-black opacity-75 font-cabinet-grotesk ${tier.highlight ? 'text-white' : 'text-biro-blue-dark'} mb-2 uppercase`}>{tier.name}</h3>


                            <div className="space-y-4 mb-10 flex-grow relative z-10">
                                {tier.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] mt-0.5 shrink-0 ${tier.highlight ? 'bg-blue-50 text-highlight-yellow border border-blue-100' : 'bg-blue-50/50 text-biro-blue border border-blue-100/50'}`}>
                                            ✓
                                        </div>
                                        <p className={`text-slate-700 font-bold text-sm leading-relaxed ${tier.highlight ? 'text-white' : 'text-slate-700'}`}>
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={onRegisterClick}
                                variant={tier.highlight ? 'primary' : 'outline'}
                                className="w-full rounded-md relative z-10"
                            >
                                Get Your Pass
                            </Button>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
